package main

import (
	"errors"
	"time"

	"gorm.io/gorm"
)

type TextView struct {
	Id         string     `json:"id"`
	UserID     string     `json:"userID"`
	Handle     string     `json:"handle"`
	Body       string     `json:"body"`
	Title      string     `json:"title"`
	CreatedAt  time.Time  `json:"created_at"`
	Expire_at  *time.Time `json:"expire_at"`
	TextLength int        `json:"TextLength"`
	Tag        string     `json:"tag"`
}
type getTextRequest struct {
	Id string `json:"id"`
}

func getText(db *gorm.DB, id string) []TextView {
	var text []TextView
	err := db.Model(&Text{}).First(&text, "id=?", id).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil
	} else if err != nil {
		panic("Could not fetch from db")
	}
	return text
}
