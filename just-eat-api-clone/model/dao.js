const fs = require("fs").promises;

// Funzione che recupera tutti i ristoranti nel sistema
async function getRistoranti() {
    const fileContent = await fs.readFile('data/ristoranti.json');
    return JSON.parse(fileContent);
    // return await smartGetData('ristoranti')
}

// Funzione che recupera tutti gli ordini nel sistema
async function getOrdini() {
    const fileContent = await fs.readFile('data/ordini.json');
    return JSON.parse(fileContent)
    // return await smartGetData('ordini')
}

// Funzione che recupera un ordine specifico su un dato ristorante
async function getOrdine(ristorante_id, ordine_id) {
    const ordini = await getOrdiniRistorante(ristorante_id) //Recupero gli ordini di uno specifico ristorante

    //Ciclo gli ordini del ristorante per trovare quello con l'id che mi viene passato come parametro
    for (let i = 0; i < ordini.length; i++) {
        const one = ordini[i]
        if (one.id === ordine_id) {
            return one
        }
    }
    return undefined //Significa che non lo ho trovato
}

// Funzione che aggiorna un ordine
async function updateOrder(ristorante_id, ordine_id, updated_ordine) {
    // Recupero gli ordini di tutto il sistema perchè poi devo riscrivere tutto il file.. 
    // Recuperare solo gli ordini di un ristorante non avrebbe senso in quanto adrei a cancellare quelli di altri ristoranti
    const ordini = await getOrdini()
    for (let i = 0; i < ordini.length; i++) {
        const one = ordini[i]
        if (one.id === ordine_id && one.ristorante_id === ristorante_id) {
            ordini[i] = {
                ...ordini[i], // Destrutturazione dell'oggetto
                ...updated_ordine,
            }
            break;
        }

    }
    const ordiniAsString = JSON.stringify(ordini) //Trasformo l'array in stringa per scriverlo nel file
    try {
        await fs.writeFile('data/ordini.json', ordiniAsString) //Per semplicità riscrivo tutto il file e non faccio l'append del solo elemento all'interno del file
        return true
    } catch (err) {
        console.error(err)
        throw Error(`Errore durante aggiornamento dell'item. Err: ${err.message}`)
    }
}

// Funzione che elimina un ordine
async function deleteOrder(ristorante_id, ordine_id) {
    // Recupero gli ordini di tutto il sistema perchè poi devo riscrivere tutto il file.. 
    // Recuperare solo gli ordini di un ristorante non avrebbe senso in quanto adrei a cancellare quelli di altri ristoranti
    const ordini = await getOrdini()
    for (let i = 0; i < ordini.length; i++) {
        const one = ordini[i]
        if (one.id === ordine_id && one.ristorante_id === ristorante_id) {
            ordini.splice(i, 1) //Rimuovo l'elemento dall'array
            break;
        }

    }
    const ordiniAsString = JSON.stringify(ordini) //Trasformo l'array in stringa per scriverlo nel file
    try {
        await fs.writeFile('data/ordini.json', ordiniAsString) //Per semplicità riscrivo tutto il file e non faccio l'append del solo elemento all'interno del file
        return true
    } catch (err) {
        console.error(err)
        throw Error(`Errore durante aggiornamento dell'item. Err: ${err.message}`)
    }
}

// Funzione che recupera gli ordini di un ristorante
async function getOrdiniRistorante(ristorante_id) {
    const ordini = await getOrdini()
    return ordini.filter((el) => el.ristorante_id === ristorante_id)
}

// Funzione che crea un ordine
async function createOrdine(obj) {
    const ordini = await getOrdini()
    // Simulo un id auto incrementale.. In realta non è una soluzione ottimale in quanto se si cancellano degli ordini l'id non è più incrementale ma PER SEMPLICITA' va bene.
    // La cosa corretta da fare sarebbe quella di recuperare l'ultimo id e incrementarlo di 1, ma anche in questo caso non sarebbe una soluzione ottimale 
    // in quanto se si cancellano degli ordini l'id generato potrebbe essere già stato assegnato in precedenza
    const idOrdine = ordini.length + 1
    const newOrder = {
        id: idOrdine, //Aggiungo l'id all'oggetto
        ...obj // Destrutturo l'oggetto
    }
    ordini.push(newOrder)
    const ordiniAsString = JSON.stringify(ordini) //Trasformo l'array in stringa per scriverlo nel file
    try {
        await fs.writeFile('data/ordini.json', ordiniAsString) //Per semplicità riscrivo tutto il file e non faccio l'append del solo elemento all'interno del file
        return newOrder //Ritorno l'oggetto inserito
    } catch (err) {
        console.error(err)
        throw Error(`Errore durante inserimento dell'item. Err: ${err.message}`)
    }
}

/* 
Questa è una ipotetica soluzione per gestire in un punto solo il recupero dei dati in modo "smart".

async function smartGetData(dataType) {
  const fileContent = await fs.readFile(`data/${dataType}.json`);
  return JSON.parse(fileContent);
} */



exports.getRistoranti = getRistoranti
exports.getOrdini = getOrdini
exports.getOrdine = getOrdine
exports.updateOrder = updateOrder
exports.deleteOrder = deleteOrder
exports.getOrdiniRistorante = getOrdiniRistorante
exports.createOrdine = createOrdine
// exports.smartGetData = smartGetData