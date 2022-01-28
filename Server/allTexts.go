package main

import (
	"gorm.io/gorm"
)

type AllTextsResponse struct {
	Texts []Text `json:"texts"`
}

func allTexts(db *gorm.DB) []Text {
	var texts []Text
	err := db.Find(&texts).Error
	if err != nil {
		panic("Could not fetch from db")
	}
	return texts
}
