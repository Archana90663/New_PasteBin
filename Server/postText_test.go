package main

import (
	"testing"
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func TestPostText(t *testing.T) {
	db, err := gorm.Open(sqlite.Open("test.db"))
	db.AutoMigrate(&Text{})
	currTime := time.Now()
	uploadText := &Text{Body: "body", Title: "title", Expire_at: &currTime, Tag: "public"}
	err, id := postText(db, *uploadText, "206.71.50.230")

	if err != nil {
		panic(err.Error())
	}
	var textResponse []Text
	err = db.Model(&Text{}).First(&textResponse, "id=?", id).Error
	if err != nil {
		panic(err.Error())
	}
	if len(textResponse) != 1 {
		t.Error("Expected to get 1 value")
	}
	text := textResponse[0]

	if text.Title != "title" {
		t.Error("Incorrect Title")
	}
	if text.Body != "body" {
		t.Error("Incorrect Body")
	}

	if !currTime.Equal(*(text.Expire_at)) {
		t.Error("Incorrect Expire_at")
	}

	if text.TextLength != 4 {
		t.Error("Incorrect lenght")
	}

	if text.Tag != "public" {
		t.Error("Incorrect Tag")
	}
	if text.IpAddress != "206.71.50.230" {
		t.Error("Incorrect IP")
	}
	if text.UserCountry != "United States" {
		t.Error("Incorrect user country")
	}
	db.Delete(&text)
}
