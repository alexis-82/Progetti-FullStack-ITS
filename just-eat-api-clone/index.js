const express = require('express');
const app = express()
const port = 3000
app.use('/public', express.static(__dirname + '/public'));

const { getRistoranti } = require('./model/dao')
const { getOrdini } = require('./model/dao')

const domain = process.env.domain

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// API che gestiscono la lista dei ristoranti
app.get('/ristoranti', async (req, res) => {
    // const city = req.query.city
    // const address = req.query.address
    const ristoranti = await getRistoranti()
    const { city } = req.query // const { city, address } = req.query
    if (city) {
        const ristorantiFiltrati = ristoranti.filter(ristorante => ristorante.città.toLowerCase() === city.toLowerCase().trim());
        
        for (let i = 0; i < ristorantiFiltrati.length; i++){
            ristorantiFiltrati[i] = {
                ...ristorantiFiltrati[i],
                image: domain+ristorantiFiltrati[i].image
            }
        }
        
        res.json(ristorantiFiltrati);
    } else {
        for (let i = 0; i < ristoranti.length; i++) {
            ristoranti[i] = {
                ...ristoranti[i],
                image: domain + ristoranti[i].image
            }
        }
        res.json(ristoranti);
    }
    // Sviluppare la logica di recupero dei ristoranti
})

// Recupero di un singolo ristorante
app.get('/ristoranti/:id', async (req, res) => {
    const { id } = req.params
    const intId = parseInt(id)

    if (isNaN(intId)) return res.status(400).send()
    let ristoranti = await getRistoranti()
    const ristorante = ristoranti.find((el) => el.id === intId)


    if (!ristorante) {
        res.status(404).json({ error: 'Ristorante non trovato' })
        res.json(ristorante);
    }
    return res.json(ristorante)
    // console.log('Recupero di un singolo ristorante')
    // res.json('Recupero di un singolo ristorante')
})

/* API responsabile della creazione di un ordine */
app.post('/ristoranti/:id/ordini', checkRistoranteExist, async (req, res) => {

    const { id } = req.params
    const ristorante_id = parseInt(id)  //Trasformo l'id del ristorante da stringa a intero → Dò per scontato che sia un intero in quanto il controllo lo ha fatto il middleware

    const { sconto, tipologia_spedizione, totale, valuta, vat } = req.body

    const insertedItem = await createOrdine({
        ristorante_id,
        sconto,
        tipologia_spedizione,
        totale,
        valuta,
        vat,
        data_ordine: new Date().toLocaleString(),
        codice_ordine: (Math.random() + 1).toString(36).substring(7).toUpperCase() //Genero un codice casuale

    })
    /* Status 201 indica che la risorsa è stata creata.  */
    return res.status(201).json('Ok!')
    /*  E' anche possibile ritornare l'oggetto inserito.. Il client potrebbe aver bisogno dell'id dell'ordine appena creato*/
    // return res.status(201).json(insertedItem)
})

/* API responsabile del recupero di un ordine */
app.get('/ristoranti/:id/ordini/:ordine_id', checkRistoranteExist, checkIfOrdineOfRistoranteExist, async (req, res) => {
    let { id, ordine_id } = req.params

    const ristorante_id = parseInt(id) //Trasformo l'id del ristorante da stringa a intero → Dò per scontato che sia un intero in quanto il controllo lo ha fatto il middleware
    ordine_id = parseInt(ordine_id) //Trasformo l'id dell'ordine da stringa a intero → Dò per scontato che sia un intero in quanto il controllo lo ha fatto il middleware
    const ordine = await getOrdine(ristorante_id, ordine_id)
    if (!ordine) return res.status(404).send("Not Found!") //L'operatore ! controlla se è undefined 
    return res.json(ordine)
})


/* API responsabile della modifica di un ordine */
app.put('/ristoranti/:id/ordini/:ordine_id', checkRistoranteExist, checkIfOrdineOfRistoranteExist, async (req, res) => {
    let { id, ordine_id } = req.params

    const ristorante_id = parseInt(id) //Trasformo l'id del ristorante da stringa a intero → Dò per scontato che sia un intero in quanto il controllo lo ha fatto il middleware
    ordine_id = parseInt(ordine_id) //Trasformo l'id dell'ordine da stringa a intero → Dò per scontato che sia un intero in quanto il controllo lo ha fatto il middleware

    //Non devo controllare se l'ordine esiste in quanto lo hanno fatto i middleware

    //updateResponse è un boolean che indica se l'aggiornamento è andato a buon fine
    const updateResponse = await updateOrder(ristorante_id, ordine_id, {
        ...req.body
    })
    if (!updateResponse) {
        return res.status(404).send("Not Found!")
    } else {
        return res.status(204).send()
    }

})


/* API responsabile della cancellazione di un ordine */
app.delete('/ristoranti/:id/ordini/:ordine_id', checkRistoranteExist, checkIfOrdineOfRistoranteExist, async (req, res) => {
    let { id, ordine_id } = req.params
    const ristorante_id = parseInt(id) //Trasformo l'id del ristorante da stringa a intero → Dò per scontato che sia un intero in quanto il controllo lo ha fatto il middleware
    ordine_id = parseInt(ordine_id) //Trasformo l'id dell'ordine da stringa a intero → Dò per scontato che sia un intero in quanto il controllo lo ha fatto il middleware

    const deleteOrderResponse = await deleteOrder(ristorante_id, ordine_id)
    // Se deleteOrderResponse è false significa che la cancellazione non è andata a buon fine
    if (!deleteOrderResponse) {
        return res.status(404).send("Not Found!")
    }
    return res.status(204).send()
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})