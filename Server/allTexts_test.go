package main

import (
	"testing"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func TestAllTexts(t *testing.T) {
	db, err := gorm.Open(sqlite.Open("test.db"))
	db.AutoMigrate(&Text{})
	db.Where("1 = 1").Delete(&Text{})
	uploadText := &Text{Body: "body", Title: "title", Tag: "public"}
	uploadText2 := &Text{Body: "body2", Title: "title2", Tag: "private"}
	uploadText3 := &Text{Body: "body3", Title: "title3", Tag: "public"}
	err, _ = postText(db, *uploadText, "206.71.50.230")
	if err != nil {
		panic(err.Error())
	}
	err, _ = postText(db, *uploadText2, "206.71.50.230")
	if err != nil {
		panic(err.Error())
	}
	err, _ = postText(db, *uploadText3, "206.71.50.230")
	if err != nil {
		panic(err.Error())
	}
	textResponse := allTexts(db)
	if len(textResponse) != 2 {
		t.Error(len(textResponse))
	}

	text := textResponse[0]
	if text.Title != "title3" {
		t.Error("Incorrect Title")
	}
	if text.Body != "body3" {
		t.Error("Incorrect Body")
	}

	db.Delete(&text)

	text = textResponse[1]
	if text.Title != "title" {
		t.Error("Incorrect Title")
	}
	if text.Body != "body" {
		t.Error("Incorrect Body")
	}

	db.Delete(&text)
}
