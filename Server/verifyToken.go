package main

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"gorm.io/gorm"
)

type UserInfo struct {
	Id      string `json:"id"`
	Name    string `json:"name"`
	Email   string `json:"email"`
	Picture string `json:"picture"`
	Sub     string `json:"sub"`
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

func verifyIdToken(db *gorm.DB, idToken string) (UserInfo, error) {
	//https://oauth2.googleapis.com/tokeninfo?id_token=
	// resp, err := httpClient.Get("https://oauth2.googleapis.com/tokeninfo?id_token=")
	// if err != nil {
	// 	return UserId{}, err
	// }

	resp, err := http.Get("https://oauth2.googleapis.com/tokeninfo?id_token=" + idToken)
	if err != nil {
		return UserInfo{}, err
	}
	//We Read the response body on the line below.
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return UserInfo{}, err
	}
	var user UserInfo
	err = json.Unmarshal(body, &user)
	if err != nil {
		return UserInfo{}, err
	}
	user.Id = user.Sub
	return user, nil
}
