const express = require('express')
const bodyParser = require('body-parser')
const recipeRoutes = require('./routes/recipes')
const cors = require('cors')


const app = express()
const port = 3000

app.use(cors())

app.use(express.static('public'))

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Benvenuto in RecipeMaster')
})

app.use('/api/recipes', recipeRoutes)

app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`)
})