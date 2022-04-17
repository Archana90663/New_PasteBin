package main

import (
	"errors"

	"gorm.io/gorm"
)

func getUser(db *gorm.DB, id string) []UserInfo {
	println(id)
	var user []UserInfo
	err := db.Model(&UserInfo{}).First(&user, "id=?", id).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil
	} else if err != nil {
		panic("Could not fetch from db")
	}
	return user
}
