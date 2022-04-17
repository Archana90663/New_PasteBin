package main

import (
	"errors"
	"time"

	"gorm.io/gorm"
)

type TextView struct {
	Id         string     `gorm:"texts.id" json:"id"`
	UserID     string     `json:"userID"`
	Body       string     `json:"body"`
	Title      string     `json:"title"`
	CreatedAt  time.Time  `json:"created_at"`
	Expire_at  *time.Time `json:"expire_at"`
	TextLength int        `json:"TextLength"`
	Tag        string     `json:"tag"`
	Language   string     `json:"language"`
	Name       string     `json:"name"`
	Email      string     `json:"email"`
	Picture    string     `json:"picture"`
}
type getTextRequest struct {
	Id string `json:"id"`
}

func getText(db *gorm.DB, id string) []TextView {
	var text []TextView
	err := db.Model(&Text{}).Select("texts.id", "texts.user_id", "texts.body", "texts.title", "texts.created_at", "texts.expire_at", "texts.ip_address", "texts.user_country", "texts.text_length", "texts.tag", "texts.language", "user_infos.name", "user_infos.email", "user_infos.picture").Joins("left join user_infos on texts.user_id = user_infos.id").Scan(&TextView{}).First(&text, "texts.id=?", id).Error

	// err := db.Model(&Text{}).First(&text, "id=?", id).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil
	} else if err != nil {
		panic("Could not fetch from db")
	}
	return text
}
