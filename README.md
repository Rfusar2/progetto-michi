# MASTER CONTROLLER

## Database

FILE: app\database\*.json

ci sono tre tabelle princiapali:

* storehouse.json

* orders.json

* customers.json

### Struttura STOREHOUSE

Esempio:

```json
{
  "materials": [
    {
      "id": 0,
      "name": "pelle mucca 20cm",
      "free": 9,
      "blocked": 1
    }
  ],
  "products": [
    {
      "id": 0,
      "name": "scpa",
      "status": 1,
      "materials": [
        0
      ]
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
    "name": "non so",
    "customer": 0,
    "status": 1,
    "products": [
      0
    ],
    "description": "paga dopo 20gg"
  }
]
```

### Struttura CUSTOMERS

Esempio:

```json
[
  {
    "id": 0,
    "name": "",
    "surname": "",
    "address": ""
  }
]
```

### Logica

* registro dei materiali e dei clienti

* associo i materiali per creare il prodotto

* creo l'ordine associando il prodotto al cliente


## INSTALLAZIONE

[INSTALAZIONE](docs\installazione.mp4)
