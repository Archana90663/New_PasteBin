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
	a.db.AutoMigrate(&Person{}, &Text{})

	// Add test data into db
	a.db.Create(&Person{Id: 1, FirstName: "fn", LastName: "ln"})

	a.r.HandleFunc("/test", a.test).Methods("GET")
	a.r.HandleFunc("/api/submitText", a.addText).Methods("POST")
	a.r.HandleFunc("/api/allTexts", a.allTexts).Methods("GET")
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
func (a *App) addText(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var text Text
	err := json.NewDecoder(r.Body).Decode(&text)
	if err != nil {
		sendErr(w, http.StatusBadRequest, err.Error())
		return
	}
	if text.Body == "" {
		sendErr(w, http.StatusBadRequest, "Cannot post text with empty body")
		return
	}
	if text.Title == "" {
		sendErr(w, http.StatusBadRequest, "Cannot post text with title")
		return
	}
	err = postText(a.db, text)
	if err != nil {
		sendErr(w, http.StatusBadRequest, err.Error())
	} else {
		w.WriteHeader(http.StatusCreated)
	}
}
func (a *App) allTexts(w http.ResponseWriter, r *http.Request) {
	var response AllTextsResponse
	texts := allTexts(a.db)
	response.Texts = texts
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
