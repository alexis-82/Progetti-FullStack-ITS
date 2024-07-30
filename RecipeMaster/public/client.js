// Funzioni per interagire con l'API
async function addRecipe(recipe) {
    const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    });
    return response.json();
}

async function getAllRepices() {
    const response = await fetch('/api/recipes');
    return response.json();
}

async function deleteRecipe(id) {
    const response = await fetch(`/api/recipes/${id}`, {
        method: 'DELETE'
    });
    return response.json();
}

// Funzioni per manipolare il DOM
function displayRecipes(recipes) {
    const recipesList = document.getElementById('recipeList');
    recipesList.innerHTML = '';
    recipes.forEach(recipe => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h3>${recipe.nome}</h3>
            <p><strong>Ingredienti:</strong> ${recipe.ingredienti.join(', ')}</p>
            <p><strong>Instruzioni:</strong> ${recipe.instruzioni}</p>
            <button onclick="removeRecipe(${recipe.id})">Elimina</button>
        `;
    })
}

// Event listeners
document.getElementById('recipeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('recipeName').value
    const ingredients = document.getElementById('recipeIngredients').value.split(',').map(i => i.trim())
    const instructions = document.getElementById('recipeInstructions').value

    const newRecipe = await addRecipe({ nome: name, ingredienti: ingredients, istruzioni: instructions })
    updateRecipeList()
    e.target.reset()
})

async function removeRecipe(id) {
    await deleteRecipe(id)
    updateRecipeList()
}

async function updateRecipeList() {
    const recipes = await getAllRepices();
    displayRecipes(recipes);
}

// Inizializza la lista delle ricette al caricamento della pagina