package main

import (
	"net/http"

	"google.golang.org/api/oauth2/v2"
	"gorm.io/gorm"
)

type UserInfo struct {
	Id     string `json:"id"`
	Handle string `json:"handle" gorm:"uniqueIndex"`
}
type UserInfoRequest struct {
	IdToken string `json:"idToken"`
}
type UserRegisterRequest struct {
	IdToken string `json:"idToken"`
	Handle  string `json:"handle"`
}
type UserId struct {
	Id string `json:"id"`
}
type VerifyLoginResponse struct {
	LoggedIn bool `json:"loggedIn"`
}

var httpClient = &http.Client{}

func verifyIdToken(db *gorm.DB, idToken string) (UserId, error) {
	oauth2Service, err := oauth2.New(httpClient)
	tokenInfoCall := oauth2Service.Tokeninfo()
	tokenInfoCall.IdToken(idToken)
	tokenInfo, err := tokenInfoCall.Do()
	if err != nil {
		return UserId{}, err
	}
	return UserId{tokenInfo.UserId}, nil
}
