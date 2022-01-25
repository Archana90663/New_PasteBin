package main

import (
	"fmt"

	"github.com/gorilla/mux"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main() {

	db, err := gorm.Open(sqlite.Open("gorm.db"))
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
