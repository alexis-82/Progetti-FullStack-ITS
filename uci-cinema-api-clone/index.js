const express = require('express')
const app = express()
const port = 3000

const { getCinema } = require('./model/dao')
const { getMoviesByCategory } = require('./model/dao')

require('dotenv').config()  // Necessario per utilizzare le variabili d'ambiente (immagini ecc..)
const domain = process.env.domain // Dominio d'ambiente

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// API lista dei cinema
app.get('/cinema', async (req, res) => {
    try {
        const cinema = await getCinema();
        res.json(cinema);
    } catch (error) {
        res.status(500).json({ error: 'Si è verificato un errore durante il recupero dei cinema' });
    }
});

// API ricerca cinema per nome
app.get('/cinema/', async (req, res) => {
    const allcinema = await getCinema()
    const { nome } = req.query
    
    const cinema = allcinema.find(cinema => cinema.nome.toLowerCase() === nome.toLowerCase().trim())

    if (!cinema) {
        return res.status(404).json({ error: 'Cinema non trovato'})
    }
    return res.json(cinema)
})

// API singolo cinema
app.get('/cinema/:id', async (req, res) => {
    const { id } = req.params
    const intId = parseInt(id)

    if (isNaN(intId)) return res.status(400).send()
    let allcinema = await getCinema()
    const cinema = allcinema.find((el) => el.id === intId)

    if (!cinema) {
        res.status(404).json({ error: 'Cinema non trovato' })
        res.json(cinema)
    }
    return res.json(cinema)
})

// API recupero film
app.get('/movies', async (req, res) => {
    const { category } = req.query

    if (!category) {
        return res.status(400).json({ error: 'È necessario fornire il parametro della categoria'})
    }

    try {
        const movies = await getMoviesByCategory(category)
        // Aggiungi l'URL completo dell'immagine a ciascun film
        const moviesWithImageURL = movies.map(movie => ({
            ...movie,
            image: domain + movie.image
        }))
        res.json(moviesWithImageURL)

    } catch(error) {
        res.status(500).json({error: 'Si è verificato un errore durante il recupero dei film per categoria'})
    }
})

app.listen(port, () => {
    console.log(`Server avviato sulla porta ${port}`) 
})