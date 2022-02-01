package main

import (
	"time"

	"gorm.io/gorm"
)

type AllTextsResponse struct {
	TextListings []TextListing `json:"texts"`
}
type TextListing struct {
	Id        string    `json:"id"`
	Title     string    `json:"title"`
	CreatedAt time.Time `json:"created_at"`
}

func allTexts(db *gorm.DB) []TextListing {
	var texts []TextListing
	err := db.Model(&Text{}).Find(&texts, "expire_at > ? or expire_at is null", time.Now()).Error
	if err != nil {
		panic("Could not fetch from db")
	}
	return texts
}
