package main

import (
    "net/http"
    "fmt"
    "time"
)
var server = &http.Server{
    	Addr:           ":8080",
    	ReadTimeout:    10 * time.Second,
    	WriteTimeout:   10 * time.Second,
    	MaxHeaderBytes: 1 << 20,
    }


func main(){
    fs := http.FileServer(http.Dir("app/static"))
    http.Handle("/static/", http.StripPrefix("/static/", fs))

    for _, file := range percorsi {http.HandleFunc(file.route, file.f)}
    fmt.Println("Server acceso ===> http://127.0.0.1:8080")
    server.ListenAndServe()    
}
