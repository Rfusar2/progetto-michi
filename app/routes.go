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
    
	{route: "/db/storehouse/get", f: API_STOREHOUSE_FULL,},
    {route: "/db/orders/get",     f: API_ORDERS_FULL,},
    {route: "/db/customers/get",  f: API_CUSTOMERS_FULL,},


    {route: "/db/customers/add",  f: API_CUSTOMERS_ADD,},
}
