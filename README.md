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
        {"id": 0, "name": "Cuoio", "free": 22, "blocked": 5},
        {"id": 1, "name": "Pelle di Mucca", "free": 10, "blocked": 5 },
    ],
    "products": [
        {"id": 0,"name":"cuoio + mucca","status": 0, "materials": [0, 1]},
        {"id": 1,"name":"solo cuoio","status": 1, "materials": [0]},
        {"id": 2,"name":"solo mucca","status": 1, "materials": [1]}
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
        "id": 1,
        "name": "Titolo Ordine",
        "customer": 0,
        "details": [
            {
                "quantity": 5,
                "product": 1,
                "description": ""
            }
        ]
    },
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
