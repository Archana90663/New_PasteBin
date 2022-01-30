package main

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Text struct {
	Id        string    `json:"id"`
	Body      string    `json:"body"`
	Title     string    `json:"title"`
	CreatedAt time.Time `json:"created_at"`
}

func postText(db *gorm.DB, text Text) (error, string) {
	text.Id = uuid.New().String()
	text.CreatedAt = time.Now()
	err := db.Create(&text).Error
	return err, text.Id
}
