package main

import (
	"time"

	"gorm.io/gorm"
)

type AllTextsResponse struct {
	TextListings []TextListing `json:"texts"`
}
type TextListing struct {
	Id        string     `gorm:"texts.id" json:"id"`
	UserID    string     `json:"userID"`
	Title     string     `json:"title"`
	CreatedAt time.Time  `json:"created_at"`
	Expire_at *time.Time `json:"expire_at"`
	Body      string     `json:"body"`
	Name      string     `json:"name"`
	Email     string     `json:"email"`
	Picture   string     `json:"picture"`
}

func allTexts(db *gorm.DB) []TextListing {
	var texts []TextListing
	err := db.Order("created_at desc").Model(&Text{}).Select("texts.id", "texts.user_id", "texts.body", "texts.title", "texts.created_at", "texts.expire_at", "user_infos.name", "user_infos.email", "user_infos.picture").Joins("left join user_infos on texts.user_id = user_infos.id").Scan(&TextView{}).Find(&texts, "(expire_at > ? or expire_at is null) and (tag='public' or tag = '')", time.Now().UTC()).Error

	//err := db.Order("created_at desc").Model(&Text{}).Find(&texts, "(expire_at > ? or expire_at is null) and (tag='public' or tag = '')", time.Now().UTC()).Error
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
