package main

import (
	"log"

	"gorm.io/gorm"
)

func deleteText(db *gorm.DB, id string) bool {
	var textObject Text
	errorGet := db.Where("id = ?", id).First(&textObject)

	if errorGet != nil {
		log.Println(errorGet)
	}

	error := db.Delete(&textObject)

	if error.Error != nil {
		log.Print(error.Error)
		return false
	}
	// error.Error
	return true
}
