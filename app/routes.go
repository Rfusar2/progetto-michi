package main 

import (
	"net/http"
)

type Percorso struct{
    route   string
    f       func(http.ResponseWriter, *http.Request)  
}

//DEFINIZIONI ROUETS
var percorsi = []Percorso{
    {route: "/",  f: MAIN,},
    {route: "/db/storehouse", f: API_STOREHOUSE,},
    {route: "/db/orders",     f: API_ORDERS,},
    {route: "/db/customers",  f: API_CUSTOMERS,},
    //{route: "/dv/ordini", f: API_DB_MAGAZZINO,},
}
