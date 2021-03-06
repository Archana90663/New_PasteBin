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

func TestPostTextCreateAt(t *testing.T) {
	db, err := gorm.Open(sqlite.Open("test.db"))
	db.AutoMigrate(&Text{})
	currTime := time.Now()
	expire_at_time := currTime.Add(time.Second * 100)

	uploadText := &Text{
		Body:      "Body of a testing post",
		Title:     "Title of a testing post",
		CreatedAt: time.Now().UTC(),
		Expire_at: &expire_at_time,
		Tag:       "public"}
	err, id := postText(db, *uploadText, "206.71.50.230")
	var textResponse []Text
	err = db.Model(&Text{}).First(&textResponse, "id=?", id).Error
	if err != nil {
		panic(err.Error())
	}
	text := textResponse[0]

	if text.CreatedAt.IsZero() == true {
		t.Error("Created at time not set for the post")
	}

	var timeDiff = text.CreatedAt.Sub(time.Now())

	if timeDiff.Seconds() > 1 {
		t.Error("The time difference between the calling of test function and creation of a post is more than 1 seconds.")
	}

}
