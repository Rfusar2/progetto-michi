# MASTER CONTROLLER

## Database

ci sono tre tabelle princiapali:

* storehouse

* orders

* customers

### Struttura STOREHOUSE

Esempio:

```json
{
    "materials": [
        {
            "id": 0,
            "name": "Pelle Coccodrillo"
        },
        {
            "id": 1,
            "name": "Pelle Mucca"
        }
    ],
    "products": [
        {
            "id": 0,
            "materials": [0, 1]
        }
    ]
}
```

STOREHOUSE è diverso perchè il magazzino ha due aree:

* materials

* products

### Struttura ORDERS

Esempio:

```json
[
    {
        "id": 0,
        "name": "#TITOLOORDINE#",
        "customer": "#IDCLIENTE#",
        "details": [
            {
                "quantity": 5,
                "product": "#NOMEPRODOTTO#",
                "description": "#DESCRIZIONEPRODOTTO#"
            }
        ]
    }
]
```

### Struttura CUSTOMERS

Esempio:

```json
[
    {
        "id": 0,
        "name": "<nome cliente>",
        "surname": "<cognome cliente>",
        "address": "<indirizzo cliente>"
    }

]
```
