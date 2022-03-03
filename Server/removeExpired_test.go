package main

import (
	"testing"
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func TestRemoveExpired(t *testing.T) {
	db, err := gorm.Open(sqlite.Open("test.db"))
	db.AutoMigrate(&Text{})
	currTime := time.Now()
	uploadText := &Text{Body: "body", Title: "title", Expire_at: &currTime, Tag: "public"}
	err, id := postText(db, *uploadText, "206.71.50.230")
	if err != nil {
		panic(err.Error())
	}
	removeExpired(db)
	var textResponse []Text
	err = db.Model(&Text{}).First(&textResponse, "id=?", id).Error
	if err != nil {
		panic(err.Error())
	}
	if len(textResponse) != 1 {
		t.Error("Expected to get 1 value")
	}
	text := textResponse[0]

	if text.Title != "" {
		t.Error("Incorrect Title")
	}
	if text.Body != "" {
		t.Error("Incorrect Body")
	}

	if !currTime.Equal(*(text.Expire_at)) {
		t.Error("Incorrect Expire_at")
	}

	if text.TextLength != 0 {
		t.Error(text.TextLength)
	}

	if text.Tag != "" {
		t.Error("Incorrect Tag")
	}
	if text.IpAddress != "" {
		t.Error("Incorrect IP")
	}
	if text.UserCountry != "" {
		t.Error("Incorrect user country")
	}
	db.Delete(&text)
}
