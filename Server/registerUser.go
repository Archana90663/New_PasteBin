package main

import "gorm.io/gorm"

func registerUser(db *gorm.DB, user UserInfo) error {

	err := db.Create(&user).Error
	return err
}
