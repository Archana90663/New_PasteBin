package main

import (
	"testing"
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func TestGetText(t *testing.T) {
	db, err := gorm.Open(sqlite.Open("test.db"))
	db.AutoMigrate(&Text{})
	currTime := time.Now()
	uploadText := &Text{Id: "1234", Body: "body", Title: "title", CreatedAt: currTime, Expire_at: &currTime, IpAddress: "192.168.1.1", UserCountry: "US", TextLength: 4, Tag: "public"}
	db.Create(uploadText)

	if err != nil {
		panic(err.Error())
	}
	textResponse := getText(db, "1234")
	if len(textResponse) != 1 {
		t.Error("Expected to get 1 value")
	}
	text := textResponse[0]
	if text.Id != "1234" {
		t.Error("Incorrect Id")
	}
	if text.Title != "title" {
		t.Error("Incorrect Title")
	}
	if text.Body != "body" {
		t.Error("Incorrect Body")
	}
	if !(text.CreatedAt.Equal(currTime)) {
		t.Error("Incorrect CreatedAt")
	}
	if !currTime.Equal(*(text.Expire_at)) {
		t.Error("Incorrect Expire_at")
	}

	if text.TextLength != 4 {
		t.Error("Incorrect Id")
	}

	if text.Tag != "public" {
		t.Error("Incorrect Tag")
	}
	db.Delete(&uploadText)
}
