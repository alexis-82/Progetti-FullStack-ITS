# Progetti-ITS

## Installazione di Node.js

Installazione di Node.js tramite file binari

I passi sono:

1. **Creare una directory per Node.js** in una locazione adatta, ad esempio /opt/nodejs o /usr/local/nodejs:
   
```
sudo mkdir /opt/nodejs
```

2. **Estrarre i file binari** nella directory appena creata. Assumendo che il file scaricato sia node-vxx.x.x-linux-x64.tar.xz:

```
sudo tar -xJvf node-vxx.x.x-linux-x64.tar.xz -C /opt/nodejs
```

3. **Impostare il PATH dell'ambiente** in modo che il sistema trovi gli eseguibili di Node.js. Apri il file /etc/profile e aggiungi questa riga alla fine:

```
PATH=/opt/nodejs/bin:$PATH
```

4. **Aggiornare le variabili di ambiente** in modo che le modifiche abbiano effetto immediatamente:

```
source /etc/profile
```

5. **Verifica l'installazione** controllando le versioni di node e npm:

```
node --version
npm --version
```

In questo modo, hai effettivamente spostato i file binari di Node.js nella directory /opt/nodejs e hai configurato il tuo sistema in modo che li trovi nel PATH di esecuzione.


### ZSH

1. **Apri il file .zshrc** nel tuo home directory utilizzando un editor di testo:

```
vim ~/.zshrc
```

2. **Aggiungi la seguente riga** alla fine del file .zshrc per aggiungere la directory bin di Node.js al PATH di sistema:

```
export PATH="/opt/nodejs/bin:$PATH"
```

Assicurati di sostituire "/opt/nodejs" con il percorso in cui hai estratto i file binari di Node.js.


3. **Esci dalla shell corrente** e rientra per applicare le modifiche al PATH:

```
exit
```

4. **Verifica l'installazione** controllando le versioni di Node.js e npm:

```
node --version
npm --version
```

Se vedi le versioni corrispondenti, significa che Node.js è stato installato correttamente e reso disponibile nel PATH di sistema.

5. **Aggiornare NPM**
```
npm install -g npm@latest
```

Ricorda che modificando il file .zshrc, i cambiamenti verranno applicati ogni volta che apri una nuova sessione di Zsh. Se vuoi applicare le modifiche immediatamente nell'attuale sessione, puoi eseguire:

```
source ~/.zshrc
```

In questo modo, le modifiche al PATH verranno applicate senza dover uscire e rientrare nella shell.

---

## Installazione e aggiornamento di NVM (Node Version Manager)

[Link Ufficiale](https://github.com/nvm-sh/nvm?tab=readme-ov-file "NVM")

1. **Installazione di NVM**

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```
oppure
```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

2. **Aggiorniamo il profilo bash o zsh**

```
source ~/.bash_profile
```
oppure
```
source ~/.zshrc
```

3. **Verifichiamo l'installazione**

```
nvm -v
```

4. **Cerchiamo una versione di Node.js**

```
nvm ls-remote
```

4. **Installiamo una versione di Node.js**

```
nvm install v20.16.0
```

### Controllo della versione installata in locale
```
nvm list
```