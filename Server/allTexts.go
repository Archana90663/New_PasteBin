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
	err := db.Model(&Text{}).Limit(10).Find(&texts).Error
	if err != nil {
		panic("Could not fetch from db")
	}
	return texts
}
