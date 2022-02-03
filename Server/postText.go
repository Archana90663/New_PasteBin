package main

import (
	"log"
	"net"
	"time"
	"unicode/utf8"

	"github.com/google/uuid"
	"github.com/oschwald/geoip2-golang"
	"gorm.io/gorm"
)

type Text struct {
	Id          string    `json:"id"`
	Body        string    `json:"body"`
	Title       string    `json:"title"`
	CreatedAt   time.Time `json:"created_at"`
	TextLength  int       `json:"TextLength"`
	IpAddress   string    `json:"IpAddress"`
	UserCountry string    `json:"UserCountry"`
}

func postText(db *gorm.DB, text Text, ip string) (error, string) {
	text.Id = uuid.New().String()
	text.CreatedAt = time.Now()
	var bodyText = text.Body
	text.TextLength = utf8.RuneCountInString(bodyText)
	text.IpAddress = ip

	dbIp, errIP := geoip2.Open("GeoIP2-City.mmdb")
	if errIP != nil {
		log.Fatal(errIP)
	}
	ipParsed := net.ParseIP(ip)
	defer dbIp.Close()
	record, errRecord := dbIp.Country(ipParsed)
	if errRecord != nil {
		log.Fatal(errRecord)
	}
	text.UserCountry = record.Country.Names["en"]

	err := db.Create(&text).Error
	return err, text.Id
}
