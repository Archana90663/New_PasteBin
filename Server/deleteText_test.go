package main

import (
	"fmt"
	"testing"
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func TestDeleteText(t *testing.T) {
	db, err := gorm.Open(sqlite.Open("test.db"))
	db.AutoMigrate(&Text{})
	currTime := time.Now()
	uploadText := &Text{Id: "1234", Body: "body", Title: "title", CreatedAt: currTime, Expire_at: &currTime, IpAddress: "192.168.1.1", UserCountry: "US", TextLength: 4, Tag: "public"}
	db.Create(uploadText)

	if err != nil {
		panic(err.Error())
	}
	textResponse := deleteText(db, "1234")
	fmt.Println(textResponse)
	if textResponse {
		fmt.Println("Test Passed")
	} else {
		fmt.Println("Test Failed")
	}
}
