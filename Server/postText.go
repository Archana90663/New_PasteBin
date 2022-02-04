package main

import (
	"log"
	"net"
	"time"
	"unicode/utf8"

	"embed"

	"github.com/google/uuid"
	"github.com/oschwald/geoip2-golang"
	"gorm.io/gorm"
)

//go:embed GeoIP2-City.mmdb
var db_fs embed.FS

type Text struct {
	Id          string     `json:"id"`
	Body        string     `json:"body"`
	Title       string     `json:"title"`
	CreatedAt   time.Time  `json:"created_at"`
	Expire_at   *time.Time `json:"expire_at"`
	IpAddress   string     `json:"IpAddress"`
	UserCountry string     `json:"UserCountry"`
	TextLength  int        `json:"TextLength"`
}

func postText(db *gorm.DB, text Text, ip string) (error, string) {
	text.Id = uuid.New().String()
	text.CreatedAt = time.Now().UTC()
	var bodyText = text.Body
	text.TextLength = utf8.RuneCountInString(bodyText)
	text.IpAddress = ip
	b, _ := db_fs.ReadFile("GeoIP2-City.mmdb")
	dbIp, errIP := geoip2.FromBytes(b)
	if errIP != nil {
		log.Print(errIP)
	}
	ipParsed := net.ParseIP(ip)
	defer dbIp.Close()
	record, errRecord := dbIp.Country(ipParsed)
	if errRecord != nil {
		log.Print(errRecord)
	} else {
		text.UserCountry = record.Country.Names["en"]
	}
	err := db.Create(&text).Error
	return err, text.Id
}
