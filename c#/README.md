# Installazione di .NET in Linux tramite script.

[Link Ufficiale Microsoft](https://learn.microsoft.com/it-it/dotnet/core/install/linux-scripted-manual#scripted-install){:target="_blank"}

<a href="https://www.google.com" target="_blank">Apri Google</a>

## Comandi .NET CLI più utilizzati per progetti C# su console e WebAPI

### Comandi generali

1. Creare un nuovo progetto console:
   ```
   dotnet new console -n NomeProgetto
   ```

2. Creare una nuova soluzione:
   ```
   dotnet new sln -n NomeSoluzione
   ```

3. Aggiungere un progetto a una soluzione:
   ```
   dotnet sln NomeSoluzione.sln add ./NomeProgetto/NomeProgetto.csproj
   ```

4. Compilare il progetto:
   ```
   dotnet build
   ```

5. Eseguire il progetto:
   ```
   dotnet run
   ```

6. Ripristinare i pacchetti NuGet:
   ```
   dotnet restore
   ```

7. Aggiungere un pacchetto NuGet al progetto:
   ```
   dotnet add package NomePacchetto
   ```

8. Rimuovere un pacchetto NuGet dal progetto:
   ```
   dotnet remove package NomePacchetto
   ```

9. Pulire i file di output della build:
   ```
   dotnet clean
   ```

10. Creare un file eseguibile:
    ```
    dotnet publish -c Release
    ```

11. Eseguire i test unitari:
    ```
    dotnet test
    ```

12. Aggiungere un riferimento a un altro progetto:
    ```
    dotnet add reference ../AltroProgetto/AltroProgetto.csproj
    ```

13. Creare un nuovo progetto di test:
    ```
    dotnet new xunit -n NomeProgettoTest
    ```

14. Eseguire il progetto in modalità watch:
    ```
    dotnet watch run
    ```

### Comandi per WebAPI

15. Creare un nuovo progetto WebAPI:
    ```
    dotnet new webapi -n NomeProgettoAPI
    ```

16. Aggiungere il supporto per Swagger/OpenAPI:
    ```
    dotnet add package Swashbuckle.AspNetCore
    ```

17. Eseguire il progetto WebAPI:
    ```
    dotnet run
    ```

18. Eseguire il progetto WebAPI in modalità watch:
    ```
    dotnet watch run
    ```

Ricorda che puoi sempre usare `dotnet --help` o `dotnet [comando] --help` per ottenere ulteriori informazioni su un comando specifico.
