const fs = require('fs').promises

async function getCinema() {
    const fileContent = await fs.readFile('data/cinema.json')
    return JSON.parse(fileContent)
}

async function getMoviesByCategory(category) {
    try {
        const fileContent = await fs.readFile('data/film.json')
        const movies = JSON.parse(fileContent)

        const filteredMovies = movies.filter(movie => movie.categoria.toLowerCase() === category.toLowerCase().trim())
        return filteredMovies
    } catch (error) {
        console.error('Errore durante il recupero dei film per categoria', error)
        throw error
    }
}

exports.getCinema = getCinema
exports.getMoviesByCategory = getMoviesByCategory
