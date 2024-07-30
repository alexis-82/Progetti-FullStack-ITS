const express = require('express')
const router = express.Router()

let recipes = []

// GET tutte le ricette
router.get('/', (req, res) => {
    res.json(recipes)
})

// POST una nuova ricetta
router.post('/', (req, res) => {
    const newRecipe = req.body
    newRecipe.id = recipes.length + 1
    recipes.push(newRecipe)
    res.status(201).json(newRecipe)
})

// GET una ricetta specifica
router.get('/:id', (req, res) => {
    const recipe = recipes.find(r => r.id === parseInt(req.params.id))
    if (!recipe) return res.status(404).send('Ricetta non trovata')
    res.json(recipe)
})

// PUT (aggiorna) una ricetta esistente
router.put('/:id', (req, res) => {
    const recipe = recipe.find(r => r.id === parseInt(req.params.id))
    if (!recipe) return res.status(404).send('Ricetta non trovata')
    
    Object.assign(recipe, req.body)
    res.json(recipe)
})

// DELETE una ricetta
router.delete('/:id', (req, res) => {
    const index = recipes.findIndex(r => r.id === parseInt(req.params.id))
    if (index === -1) return res.status(404).send('Ricetta non trovata')
    
    recipes.splice(index, 1)
    res.status(204).send()
})

module.exports = router