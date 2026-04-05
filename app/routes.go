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

    {route: "/db/customers/add",  f: API_CUSTOMER_ADD,},
    {route: "/db/storehouse/materials/add",  f: API_MATERIAL_ADD,},
    {route: "/db/storehouse/products/add",  f: API_PRODUCT_ADD,},
    //{route: "/db/orders/add",  f: API_ORDERS_ADD,},
}
