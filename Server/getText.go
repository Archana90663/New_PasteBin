package main

import (
	"errors"

	"gorm.io/gorm"
)

type getTextRequest struct {
	Id string `json:"id"`
}

func getText(db *gorm.DB, id string) []Text {
	var text []Text
	err := db.First(&text, "id=?", id).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil
	} else if err != nil {
		panic("Could not fetch from db")
	}
	return text
}
