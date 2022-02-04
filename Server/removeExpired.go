package main

import (
	"fmt"
	"time"

	"gorm.io/gorm"
)

func removeExpired(db *gorm.DB) {
	fmt.Println("removing expired")
	db.Model(&Text{}).Where("expire_at < ?", time.Now().UTC()).Updates(map[string]interface{}{"Title": "", "Body": "", "created_at": ""})
}
