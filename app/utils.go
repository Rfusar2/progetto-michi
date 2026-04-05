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
	Id int `json:"id"`
	Name string `json:"name"`
	Surname string `json:"surname"`
	Address string `json:"address"`
}
//* order
type ITEM_ORDER_DETAILS struct {
	Quantity int `json:"quantity"`
	Product int `json:"product"`
	Description string `json:"description"`
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
	Free int `json:"free"`
	Blocked int `json:"blocked"`

}
type ITEM_STOREHOUSE_PRODUCT struct {
	Id int `json:"id"`
	Name string `json:"name"`
	Status int `json:"status"`
	Materials []int `json:"materials"`
}
type STOREHOUSE struct {
	Materials []ITEM_STOREHOUSE_MATERIALS `json:"materials"`
	Products []ITEM_STOREHOUSE_PRODUCT `json:"products"`
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

//============================== ROUTES ==============================
//* FRONTEND
func MAIN(w http.ResponseWriter, r *http.Request) { 
	http.ServeFile(w, r, "app/index.html") 
}

//============================== GET ==============================
//* BACKEND
func API_STOREHOUSE_FULL(w http.ResponseWriter, r *http.Request){
	data, err := GET_STOREHOUSE()
	if err != nil { http.Error(w, err.Error(), 500)}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}
func API_ORDERS_FULL(w http.ResponseWriter, r *http.Request){
	data, err := GET_ORDERS()
	if err != nil { http.Error(w, err.Error(), 500)}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}
func API_CUSTOMERS_FULL(w http.ResponseWriter, r *http.Request){
	data, err := GET_CUSTOMERS()
	if err != nil { http.Error(w, err.Error(), 500)}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

//============================== PUT ==============================
func API_CUSTOMER_ADD(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Metodo non consentito", http.StatusMethodNotAllowed)
		return
	}
	data, err := GET_CUSTOMERS()
	if err != nil { http.Error(w, err.Error(), 500);return}

	var input ITEM_CUSTOMER
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "JSON non valido", 415)
		return
	}

	//Genera ID
	lastID := -1
	if len(data) > 0 {
		lastID = data[len(data)-1].Id
	}

	newCustomer := ITEM_CUSTOMER{
		Id:      lastID + 1,
		Name:    input.Name,
		Surname: input.Surname,
		Address: input.Address,
	}
	data = append(data, newCustomer)

	//Save
	file, err := json.MarshalIndent(data, "", "  ")
	if err != nil { http.Error(w, err.Error(), 500);return}


	if err := os.WriteFile("app/database/customers.json", file, 0644); err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	//Response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(newCustomer)
}
func API_PRODUCT_ADD(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Metodo non consentito", 415)
		return
	}
	data, err := GET_STOREHOUSE()
	if err != nil { http.Error(w, err.Error(), 500);return}

	var input ITEM_STOREHOUSE_PRODUCT
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "JSON non valido", 415)
		return
	}

	for _, id := range input.Materials {
		for _, material := range data.Materials {
			//*Controllo se i materiali scelti sono disponibili
			if(material.Id == id){
				count_after_operation := material.Free-1
				if(count_after_operation < 0){
					//TODO aggiungere 'quale articolo?'
					http.Error(w,"Materiale non disponibile",500)
					return
				
				} else {
					//*Blocco il materiale
					material.Blocked += +1
					material.Free += -1
				}
			}	
		}
	}
	//Genera ID
	lastID := -1
	if len(data.Products) > 0 {
		lastID = data.Products[len(data.Products)-1].Id
	}

	newProduct := ITEM_STOREHOUSE_PRODUCT{
		Id:        lastID + 1,
		Name:      input.Name,
		Status:    0,
		Materials: input.Materials,
	}

	data.Products = append(data.Products, newProduct)

	//Save
	file, err := json.MarshalIndent(data, "", "  ")
	if err != nil { http.Error(w, err.Error(), 500);return}


	if err := os.WriteFile("app/database/storehouse.json", file, 0644); err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	//Response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(newProduct)
}
func API_MATERIAL_ADD(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "solo metodo POST", 415)
		return
	}
	data, err := GET_STOREHOUSE()
	if err != nil { http.Error(w, err.Error(), 500);return}

	var updateMaterial ITEM_STOREHOUSE_MATERIALS
	if err := json.NewDecoder(r.Body).Decode(&updateMaterial); err != nil {
		http.Error(w, "Parsing JSON Error", 415)
		return
	}


	if updateMaterial.Id != -1 {
		for i, d := range data.Materials {
			//DEBUG
			//log.Printf("ID_frontend: %v; ID_db: %v", updateMaterial.Id, d.Id)
			
			if d.Id == updateMaterial.Id {
				data.Materials[i].Free += updateMaterial.Free
				updateMaterial = data.Materials[i]
			}
		}

	} else {
		//*Aggiungi il nuovo materiale se non esiste
		var lastID int
		if len(data.Materials) > 0 {
			lastID = data.Materials[len(data.Materials)-1].Id
		}
		newMaterial := ITEM_STOREHOUSE_MATERIALS{
			Id:      lastID+1,
			Name:    updateMaterial.Name,
			Free:    updateMaterial.Free,
			Blocked: 0,
		}
		data.Materials = append(data.Materials, newMaterial)
	}


	//Save
	file, err := json.MarshalIndent(data, "", "  ")
	if err != nil { http.Error(w, err.Error(), 500);return}


	if err := os.WriteFile("app/database/storehouse.json", file, 0644); err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	//Response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(updateMaterial)
}
