package main

import (
	"embed"
	"encoding/json"
	"fmt"
	"io/fs"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

//go:embed static
var static embed.FS

type App struct {
	db *gorm.DB
	r  *mux.Router
}

func (a *App) start() {
	a.db.AutoMigrate(&Person{})

	// Add test data into db
	a.db.Create(&Person{Id: 1, FirstName: "fn", LastName: "ln"})

	a.r.HandleFunc("/test", a.test).Methods("GET")

	webapp, err := fs.Sub(static, "static")
	if err != nil {
		fmt.Println(err)
	}

	a.r.PathPrefix("/").Handler(http.FileServer(http.FS(webapp)))

	log.Fatal(http.ListenAndServe(":8080", a.r))

}
func (a *App) test(w http.ResponseWriter, r *http.Request) {
	var response Response

	//Retrieve person details
	persons := allPersons(a.db)
	response.Persons = persons

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")

	//convert struct to JSON
	jsonResponse, err := json.Marshal(response)
	if err != nil {
		sendErr(w, http.StatusInternalServerError, err.Error())
		return
	}
	w.Write(jsonResponse)
}

func sendErr(w http.ResponseWriter, code int, message string) {
	resp, _ := json.Marshal(map[string]string{"error": message})
	http.Error(w, string(resp), code)
}
