package main

import (
	"net/http"

	"google.golang.org/api/oauth2/v2"
	"gorm.io/gorm"
)

type UserInfo struct {
	Id     string `json:"id"`
	Email  string `json:"email"`
	Handle string `json:"handle"`
}
type UserInfoRequest struct {
	IdToken string `json:"idToken`
}

var httpClient = &http.Client{}

func verifyIdToken(db *gorm.DB, idToken string) (UserInfo, error) {
	oauth2Service, err := oauth2.New(httpClient)
	tokenInfoCall := oauth2Service.Tokeninfo()
	tokenInfoCall.IdToken(idToken)
	tokenInfo, err := tokenInfoCall.Do()
	if err != nil {
		return UserInfo{}, err
	}
	userInfo := UserInfo{Id: idToken, Email: tokenInfo.Email, Handle: ""}
	return userInfo, nil
}