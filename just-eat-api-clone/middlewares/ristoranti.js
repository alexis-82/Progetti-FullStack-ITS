const { getRistoranti, getOrdiniRistorante } = require('../model/dao')

/*
Middleware che controlla se l'id del ristorante ha una corrispondenza con la "base dati"
*/
async function checkRistoranteExist(req, res, next) {
    const { id } = req.params
    const intId = parseInt(id) //Trasformo l'id da stringa a intero
    //Controllo se è NaN.. In tal caso significa che non è un number
    //Può essere NaN se il path parameter "id" abbia anche caratteri alfabetici e quindi il parseInt restituisce NaN dal momento che non è possibile effettuare la conversione
    if (isNaN(intId)) return res.status(400).send()
    let ristoranti = await getRistoranti(); //Prendo i ristorandi solo dopo aver fatto i dovuti controlli.. Recuperarlo prima non avrebbe senso

    //Controllo che tra i ristoranti ce ne sia uno con l'id fornito e in caso contrario ritorno una risposta con status code 404.. 
    //Questa azione è BLOCCANTE.. Se non trovo il ristorante non viene eseguito l'handler della richiesta
    const ristorante = ristoranti.find((el) => el.id === intId)
    if (!ristorante) {
        return res.status(404).send("Not Found")
    }

    next()
}

/*
Middleware che controlla se esiste un ordine con l'id indicato associato ad un ristorante considerando anche l'identificativo di quest'ultimo
*/
async function checkIfOrdineOfRistoranteExist(req, res, next) {
    const { id, ordine_id } = req.params
    const ristorante_id = parseInt(id) //Trasformo l'id del ristorante da stringa a intero → non faccio alcun controllo aggiuntivo in quanto prima di questo middleware ci deve essere checkRistoranteExist
    const ordine_id_as_number = parseInt(ordine_id) //Trasformo l'id dell'ordine da stringa a intero
    //Controllo se è isNaN.. In tal caso significa che non è un number
    if (isNaN(ordine_id_as_number)) return res.status(400).send()

    const ordini = await getOrdiniRistorante(ristorante_id) //Recupero gli ordini di uno specifico ristorante

    //Ciclo gli ordini del ristorante per trovare quello con l'id presente nei path parameter
    let finded = false
    for (let i = 0; i < ordini.length; i++) {
        const one = ordini[i]
        if (one.id === ordine_id_as_number) {
            finded = true
        }
    }
    if (finded) {
        //Se trovo l'ordine chiamo la funzione next() per passare al prossimo middleware
        next()
    }
    // Se arrivo a questo punto significa che la funzione next() non è stata chiamata.. Significa che non è stato trovato l'ordine per lo specufuco ristorante
    //Questa azione è BLOCCANTE e non viene eseguito l'handler della richiesta
    return res.status(404).send("Order not found")
}

exports.checkRistoranteExist = checkRistoranteExist
exports.checkIfOrdineOfRistoranteExist = checkIfOrdineOfRistoranteExist