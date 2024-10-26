// Esercizio 1

// // Array di stringhe
// string[] parole = {"mela", "pera", "banana", "mela", "arancia", "mela", "kiwi"};

// string valoreDaCercare = "mela";

// // Conteggio
// int conteggio = 0;
// foreach (string parola in parole)
// {
//     if (parola == valoreDaCercare)
//     {
//         conteggio++;
//     }
// }

// Console.WriteLine($"\nLa parola {valoreDaCercare} compare {conteggio} volte nell'array");

// Esercizio 2
// Definisca una matrice quadrata di numeri interi, lo valorizzi, e calcoli la somma degli elementi presenti sulla diagonale principale (inserire una stampa a console di un esempio).

// Definizione della matrice quadrata
// int[,] matrice = {
//     { 1, 2, 3 },
//     { 4, 5, 6 },
//     { 7, 8, 9 }
// };

// // Calcolo della somma degli elementi sulla diagonale principale
// int sommaDiagonale = 0;
// int dimensione = matrice.GetLength(0); // Ottiene la dimensione della matrice

// for (int i = 0; i < dimensione; i++)
// {
//     sommaDiagonale += matrice[i, i]; // Somma gli elementi sulla diagonale principale
// }

// Console.WriteLine($"\nLa somma degli elementi sulla diagonale principale è {sommaDiagonale}");

// Esercizio 3
List<string> parole = new List<string> { "mela", "pera", "banana", "mela", "arancia", "mela", "kiwi" };
string valoreDaCercare = "mela";
bool trovato = false;

foreach (string parola in parole)
{
    if (parola == valoreDaCercare)
    {
        trovato = true;
        break;
    }
}

Console.WriteLine($"\nLa parola '{valoreDaCercare}' è presente nella lista: {trovato}");

// Esercizio 4
List<int> numeri = new List<int>() { 10, 20, 30, 40, 50 };
int somma = 0;
foreach (int numero in numeri)
{
    somma += numero;
}
double media = (double)somma / numeri.Count;
Console.WriteLine($"\nLa media dei numeri è: {media}");