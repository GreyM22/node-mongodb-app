import MoviesDAO from "../src/dao/moviesDAO"

describe("Connection", async () => {
  beforeAll(async () => {
    await MoviesDAO.injectDB(global.mflixClient)
  })

  test("Can access MFlix data", async () => {
    const mflix = global.mflixClient.db(process.env.MFLIX_NS)
    const collections = await mflix.listCollections().toArray()
    const collectionNames = collections.map(elem => elem.name)
    expect(collectionNames).toContain("movies")
    expect(collectionNames).toContain("comments")
    expect(collectionNames).toContain("users")
  })

  test("Can retrieve a movie by id", async () => {
    const id = "573a1390f29313caabcd421c"
    const movie = await MoviesDAO.getMovieByID(id)
    expect(movie.title).toEqual("A Turn of the Century Illusionist")
  })

  test("Can retrieve first page of movies", async () => {
    const {
      moviesList: firstPage,
      totalNumMovies: numMovies,
    } = await MoviesDAO.getMovies()
    expect(firstPage.length).toEqual(20)
    expect(numMovies).toEqual(12000)
  })
})
