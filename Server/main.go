package main

import (
	"fmt"

	"github.com/gorilla/mux"
)

func main() {

	db, err := getDb()
	if err != nil {
		panic(err.Error())
	}
	app := App{
		db: db,
		r:  mux.NewRouter(),
	}
	fmt.Println("Serving app on port 8080")
	app.start()
}
