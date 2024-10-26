using System.ComponentModel;

public class Cubo {
    private int lunghezza;
    private int larghezza;
    private int altezza;
    public int Lunghezza
    {
        get {
            return lunghezza;
        }
        set {
            lunghezza = value;
        }
    }
    public int Larghezza {
        get
        {
            return larghezza;
        }
        set {
            larghezza = value;
        }
    }

    public int Altezza {
        get {
            return altezza;
        }
        set
        {
            altezza = value;
        }
    }

    public int VisualizzaVolume() {
        return lunghezza * larghezza * altezza; 
    }
}