package main

import (
	"errors"
	"time"

	"gorm.io/gorm"
)

func allUserTexts(db *gorm.DB, userId string) []TextListing {
	var texts []TextListing
	err := db.Order("created_at desc").Model(&Text{}).Select("texts.id", "texts.user_id", "texts.body", "texts.title", "texts.created_at", "texts.expire_at", "user_infos.name", "user_infos.email", "user_infos.picture").Joins("left join user_infos on texts.user_id = user_infos.id").Scan(&TextView{}).Find(&texts, "(expire_at > ? or expire_at is null) and (user_id = ?)", time.Now().UTC(), userId).Error
	// err := db.Order("created_at desc").Model(&Text{}).Find(&texts, "(expire_at > ? or expire_at is null) and (user_id = ?)", time.Now().UTC(), userId).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return texts
	} else if err != nil {
		panic("Could not fetch from db")
	}
	for index, text := range texts { // you can escape index by _ keyword
		if len(text.Body) > 250 {
			texts[index].Body = text.Body[:250] + "..."
		}

	}
	return texts
}
