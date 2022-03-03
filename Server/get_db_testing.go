//go:build testing
// +build testing

package main

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func getDb() (*gorm.DB, error) {
	db, err := gorm.Open(sqlite.Open("test.db"))
	print("testing")
	return db, err
}
