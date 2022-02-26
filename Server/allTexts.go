package main

import (
	"time"

	"gorm.io/gorm"
)

type AllTextsResponse struct {
	TextListings []TextListing `json:"texts"`
}
type TextListing struct {
	Id        string     `json:"id"`
	Title     string     `json:"title"`
	CreatedAt time.Time  `json:"created_at"`
	Expire_at *time.Time `json:"expire_at"`
	Body      string     `json:"body"`
}

func allTexts(db *gorm.DB) []TextListing {
	var texts []TextListing
	err := db.Model(&Text{}).Find(&texts, "(expire_at > ? or expire_at is null) and (tag='public' or tag = '')", time.Now().UTC()).Error
	if err != nil {
		panic("Could not fetch from db")
	}
	for index, text := range texts { // you can escape index by _ keyword
		if len(text.Body) > 250 {
			texts[index].Body = text.Body[:250] + "..."
		}

	}
	return texts
}
