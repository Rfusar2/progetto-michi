package main

import (
	"encoding/json"
	"os"
	_ "log"
    "net/http"
)

//============================== TYPES TABLES ==============================
//* customer
type ITEM_CUSTOMER struct {
	Name string `json:"name"`
	Surname string `json:"surname"`
	Address string `json:"address"`
}
//* order
type ITEM_ORDER_DETAILS struct {
	Quantity int `json:"quantity"`
	Product int `json:"product"`
	Description int `json:"description"`
}
type ITEM_ORDER struct {
	Id int `json:"id"`
	Name string `json:"name"`
	Customer int `json:"customer"`
	Details ITEM_ORDER_DETAILS `json:"customer"`
}

//* storehouse
type ITEM_STOREHOUSE_MATERIALS struct {
	Id int `json:"id"`
	Name string `json:"name"`
	Blocked bool `json:"blocked"`
}
type ITEM_STOREHOUSE_PRODUCT struct {
	Id int `json:"id"`
	Status int `json:"status"`
	Materials []int `json:"materials"`
}
type STOREHOUSE struct {
	Materials []ITEM_STOREHOUSE_MATERIALS `json:"materials"`
	Product []ITEM_STOREHOUSE_PRODUCT `json:"products"`
}


//============================== METHODS ==============================

//TODO CREARE FUNZIONE O MEGLIO METODI D'ASSEGNARE AD UNA CLASSE  
func GET_STOREHOUSE() (STOREHOUSE, error) {
	var storehouse STOREHOUSE
	data, err := os.ReadFile("app/database/storehouse.json")
	if err != nil { return storehouse, err}
	err = json.Unmarshal(data, &storehouse)
	if err != nil {return storehouse, err}

	return storehouse, nil
}
func GET_ORDERS() ([]ITEM_ORDER, error) {
	var orders []ITEM_ORDER
	data, err := os.ReadFile("app/database/orders.json")
	if err != nil { return orders, err}
	err = json.Unmarshal(data, &orders)
	if err != nil {return orders, err}

	return orders, nil
}
func GET_CUSTOMERS() ([]ITEM_CUSTOMER, error) {
	var customers []ITEM_CUSTOMER
	data, err := os.ReadFile("app/database/customers.json")
	if err != nil { return customers, err}
	err = json.Unmarshal(data, &customers)
	if err != nil {return customers, err}

	return customers, nil
}



func API_STOREHOUSE(w http.ResponseWriter, r *http.Request){
	data, err := GET_STOREHOUSE()
	if err != nil { http.Error(w, err.Error(), 500)}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

func API_ORDERS(w http.ResponseWriter, r *http.Request){
	data, err := GET_ORDERS()
	if err != nil { http.Error(w, err.Error(), 500)}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}
func API_CUSTOMERS(w http.ResponseWriter, r *http.Request){
	data, err := GET_CUSTOMERS()
	if err != nil { http.Error(w, err.Error(), 500)}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}


//* FRONTEND
func MAIN(w http.ResponseWriter, r *http.Request) { 
	http.ServeFile(w, r, "app/index.html") 
}
