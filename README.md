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
        {"id": 0,"blocked": false,"name": "A"},
        {"id": 1,"blocked": false,"name": "B"},
        {"id": 2,"blocked": true,"name": "A"},
        {"id": 3,"blocked": true,"name": "A"},
        {"id": 4,"blocked": false,"name": "A"}
    ],
    "products": [
        {"id": 0,"name":"A","status": 0, "materials": [0, 1]},
        {"id": 1,"name":"B","status": 1, "materials": [2, 3]},
        {"id": 2,"name":"C","status": 1, "materials": [4, 5, 6, 7]}
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
