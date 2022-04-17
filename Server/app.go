package main

import (
	"embed"
	"encoding/json"
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"os"
	"path/filepath"

	// "strings"
	"time"

	"github.com/go-co-op/gocron"
	//"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
	"github.com/rs/cors"
	"gorm.io/gorm"
)

//go:embed static
var static embed.FS

type App struct {
	db *gorm.DB
	r  *mux.Router
}
type spaHandler struct {
	staticFS   embed.FS
	staticPath string
	indexPath  string
}

var cookieStore = sessions.NewCookieStore([]byte("pb-secret"))
var cookie = "pb-login-token"

// Solution by https://github.com/gorilla/mux/issues/637
func (h spaHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// get the absolute path to prevent directory traversal
	path, err := filepath.Abs(r.URL.Path)
	if err != nil {
		// if we failed to get the absolute path respond with a 400 bad request and stop
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// prepend the path with the path to the static directory
	path = filepath.Join(h.staticPath, path)

	_, err = h.staticFS.Open(path)
	if os.IsNotExist(err) {
		// file does not exist, serve index.html
		index, err := h.staticFS.ReadFile(filepath.Join(h.staticPath, h.indexPath))
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		w.WriteHeader(http.StatusAccepted)
		w.Write(index)
		return
	} else if err != nil {
		// if we got an error (that wasn't that the file doesn't exist) stating the
		// file, return a 500 internal server error and stop
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// get the subdirectory of the static dir
	statics, err := fs.Sub(h.staticFS, h.staticPath)
	// otherwise, use http.FileServer to serve the static dir
	http.FileServer(http.FS(statics)).ServeHTTP(w, r)
}
func (a *App) start() {
	a.db.AutoMigrate(&Person{}, &Text{}, &UserInfo{})
	s := gocron.NewScheduler(time.UTC)
	s.Every(300).Seconds().Do(removeExpired, a.db)
	s.StartAsync()
	// Add test data into db
	a.db.Create(&Person{Id: 1, FirstName: "fn", LastName: "ln"})
	a.r.HandleFunc("/api/submitText", a.addText).Methods("POST")
	a.r.HandleFunc("/api/allTexts", a.allTexts).Methods("GET")
	a.r.HandleFunc("/api/getText", a.getText).Methods("POST")
	a.r.HandleFunc("/api/verifyToken", a.verifyToken).Methods("POST")
	a.r.HandleFunc("/api/login", a.userLogin).Methods("POST")
	a.r.HandleFunc("/api/userInfo", a.userInfo).Methods("GET")
	a.r.HandleFunc("/api/logout", a.userLogout).Methods("GET")
	// a.r.HandleFunc("/api/signup", a.userRegister).Methods("POST")
	a.r.HandleFunc("/api/verifyLogin", a.verifyLogin).Methods("GET")
	a.r.HandleFunc("/api/allUserTexts", a.allUserTexts).Methods("GET")
	a.r.HandleFunc("/api/deleteText", a.deleteText).Methods("POST")
	spa := spaHandler{staticFS: static, staticPath: "static", indexPath: "index.html"}
	a.r.PathPrefix("/").Handler(spa)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:4200"},
		AllowedMethods:   []string{http.MethodGet, http.MethodPost, http.MethodDelete},
		AllowCredentials: true,
	})
	log.Fatal(http.ListenAndServe(":8080", c.Handler(a.r))) //handlers.CORS(originsOk, headersOk, methodsOk)(a.r)))

}

func (a *App) addText(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var text Text
	err := json.NewDecoder(r.Body).Decode(&text)
	if err != nil {
		sendErr(w, http.StatusBadRequest, err.Error())
		return
	}
	if text.Body == "" {
		sendErr(w, http.StatusBadRequest, "Cannot post text with empty body")
		return
	}
	if text.Title == "" {
		sendErr(w, http.StatusBadRequest, "Cannot post text with empty title")
		return
	}

	if len(text.Title) > 260 {
		sendErr(w, http.StatusBadRequest, "Cannot post text title of more than 260 characters")
		return
	}
	if len(text.Body) > 10000 {
		sendErr(w, http.StatusBadRequest, "Cannot post text title of more than 10,000 characters")
		return
	}
	if text.Expire_at != nil && text.Expire_at.Before(time.Now()) {
		sendErr(w, http.StatusBadRequest, "Text expiry cannot be before current time")
		return
	}
	if (text.Tag != "private") && (text.Tag != "public") && (text.Tag != "unlisted") && (text.Tag != "") {
		sendErr(w, http.StatusBadRequest, "Post does not have an appropriate tag")
		return
	}
	langs := [...]string{"abap", "aes", "apex", "azcli", "bat", "bicep", "c", "cameligo", "clojure", "coffeescript", "cpp", "csharp", "csp", "css", "dart", "dockerfile", "ecl", "elixir", "flow9", "freemarker2", "freemarker2.tag-angle.interpolation-bracket", "freemarker2.tag-angle.interpolation-dollar", "freemarker2.tag-auto.interpolation-bracket", "freemarker2.tag-auto.interpolation-dollar", "freemarker2.tag-bracket.interpolation-bracket", "freemarker2.tag-bracket.interpolation-dollar", "fsharp", "go", "graphql", "handlebars", "hcl", "html", "ini", "java", "javascript", "json", "julia", "kotlin", "less", "lexon", "liquid", "lua", "m3", "markdown", "mips", "msdax", "mysql", "objective-c", "pascal", "pascaligo", "perl", "pgsql", "php", "pla", "plaintext", "postiats", "powerquery", "powershell", "proto", "pug", "python", "qsharp", "r", "razor", "redis", "redshift", "restructuredtext", "ruby", "rust", "sb", "scala", "scheme", "scss", "shell", "sol", "sparql", "sql", "st", "swift", "systemverilog", "tcl", "twig", "typescript", "vb", "verilog", "xml", "yaml"}
	if text.Language != "" {
		valid := false
		for _, ele := range langs {
			if text.Language == ele {
				valid = true
			}
		}
		if !valid {
			sendErr(w, http.StatusBadRequest, "Invalid language")
			return
		}
	}
	userIdString := ""
	session, err := cookieStore.Get(r, cookie)
	if err == nil {
		userId := session.Values["user"]
		if userId != nil {
			userIdString = session.Values["user"].(string)
			// userInfo := getUser(a.db, userId.(string))[0]
			// handle = userInfo.Handle
		}
	}
	if (text.Tag == "private") && userIdString == "" {
		sendErr(w, http.StatusBadRequest, "Anonymous user cannot create private paste")
		return
	}
	text.UserID = userIdString
	err, id := postText(a.db, text, GetIP(r))
	if err != nil {
		sendErr(w, http.StatusBadRequest, err.Error())
	} else {
		response := map[string]string{"id": id}
		jsonResponse, err := json.Marshal(response)
		if err != nil {
			sendErr(w, http.StatusInternalServerError, err.Error())
			return
		}
		w.WriteHeader(http.StatusCreated)
		w.Write(jsonResponse)
	}
}
func (a *App) allTexts(w http.ResponseWriter, r *http.Request) {
	var response AllTextsResponse
	texts := allTexts(a.db)
	response.TextListings = texts
	jsonResponse, err := json.Marshal(response)
	if err != nil {
		sendErr(w, http.StatusInternalServerError, err.Error())
		return
	}
	w.Write(jsonResponse)
}
func (a *App) getText(w http.ResponseWriter, r *http.Request) {
	var req getTextRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if req.Id == "" {
		sendErr(w, http.StatusBadRequest, "No Id given")
		return
	}
	userIdString := ""
	session, err := cookieStore.Get(r, cookie)
	if err == nil {
		userId := session.Values["user"]
		if userId != nil {
			userIdString = session.Values["user"].(string)
		}
	}
	text := getText(a.db, req.Id)
	if text == nil {
		sendErr(w, http.StatusNotFound, "text not found")
		return
	}
	if text[0].Tag == "private" && userIdString != text[0].UserID {
		sendErr(w, http.StatusUnauthorized, "Access to paste denied.")
		return
	}
	if text[0].Expire_at != nil && text[0].Expire_at.Before(time.Now()) {
		sendErr(w, http.StatusGone, "Expired text")
		return
	}

	jsonResponse, err := json.Marshal(text[0])
	if err != nil {
		sendErr(w, http.StatusInternalServerError, err.Error())
		return
	}
	w.Write(jsonResponse)
}

func (a *App) verifyToken(w http.ResponseWriter, r *http.Request) {
	var req UserInfoRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if req.IdToken == "" {
		sendErr(w, http.StatusBadRequest, "No Id given")
		return
	}
	userInfo, err := verifyIdToken(a.db, req.IdToken)
	if err != nil {
		sendErr(w, http.StatusUnauthorized, "could not verify given token")
		return
	}

	jsonResponse, err := json.Marshal(userInfo)
	if err != nil {
		sendErr(w, http.StatusInternalServerError, err.Error())
		return
	}
	w.Write(jsonResponse)
}

func (a *App) userLogin(w http.ResponseWriter, r *http.Request) {
	var req UserInfoRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		sendErr(w, http.StatusInternalServerError, err.Error())
		return
	}
	if req.IdToken == "" {
		sendErr(w, http.StatusBadRequest, "No Id given")
		return
	}
	userInfo, err := verifyIdToken(a.db, req.IdToken)
	if err != nil {
		sendErr(w, http.StatusUnauthorized, "could not verify given token")
		return
	}
	user := getUser(a.db, userInfo.Id)
	var currUser UserInfo
	if user == nil {
		err = registerUser(a.db, userInfo)
		if err != nil {
			sendErr(w, http.StatusInternalServerError, err.Error())
			return
		}
	} else {
		currUser = user[0]
	}
	session, err := cookieStore.New(r, cookie)
	if err == nil {
		session.Values["user"] = currUser.Id
		err = session.Save(r, w)
	}
	if err != nil {
		print(err.Error())
		sendErr(w, http.StatusConflict, "Could not setup session for user")
		return
	}
}
func (a *App) userInfo(w http.ResponseWriter, r *http.Request) {
	session, err := cookieStore.Get(r, cookie)
	if err != nil {
		sendErr(w, http.StatusInternalServerError, err.Error())
		return
	}

	userId := session.Values["user"]

	if userId == nil {
		sendErr(w, http.StatusUnauthorized, "Not logged in")
		return
	}
	userInfo := getUser(a.db, userId.(string))[0]
	jsonResponse, err := json.Marshal(userInfo)
	if err != nil {
		sendErr(w, http.StatusInternalServerError, err.Error())
		return
	}
	w.Write(jsonResponse)
}
func (a *App) userLogout(w http.ResponseWriter, r *http.Request) {
	session, err := cookieStore.Get(r, cookie)
	if err == nil {
		session.Options.MaxAge = -1
		session.Save(r, w)
	} else {
		sendErr(w, http.StatusNotFound, "No session found")
	}
}

// func (a *App) userRegister(w http.ResponseWriter, r *http.Request) {
// 	var req UserRegisterRequest
// 	err := json.NewDecoder(r.Body).Decode(&req)
// 	if err != nil {
// 		sendErr(w, http.StatusInternalServerError, err.Error())
// 		return
// 	}
// 	if req.IdToken == "" {
// 		sendErr(w, http.StatusBadRequest, "No Id given")
// 		return
// 	}
// 	if req.Handle == "" {
// 		sendErr(w, http.StatusBadRequest, "No handle given")
// 		return
// 	}
// 	userId, err := verifyIdToken(a.db, req.IdToken)
// 	if err != nil {
// 		sendErr(w, http.StatusUnauthorized, "could not verify given token")
// 		return
// 	}
// 	user := UserInfo{Id: userId.Id, Handle: req.Handle}
// 	err = registerUser(a.db, user)
// 	if err != nil {
// 		if strings.Contains(err.Error(), "UNIQUE constraint failed") {
// 			if strings.Contains(err.Error(), "user_infos.id") {
// 				sendErr(w, http.StatusMethodNotAllowed, "User already has an account")
// 				return
// 			}
// 			if strings.Contains(err.Error(), "user_infos.handle") {
// 				sendErr(w, http.StatusConflict, "Handle is taken")
// 				return
// 			}
// 			sendErr(w, http.StatusInternalServerError, err.Error())
// 		}
// 	}

// }

func (a *App) verifyLogin(w http.ResponseWriter, r *http.Request) {
	session, err := cookieStore.Get(r, cookie)
	if err != nil {
		sendErr(w, http.StatusInternalServerError, err.Error())
		return
	}
	jsonResponse, err := json.Marshal(VerifyLoginResponse{LoggedIn: true})
	userId := session.Values["user"]
	if userId == nil {
		jsonResponse, err = json.Marshal(VerifyLoginResponse{LoggedIn: false})
	}

	if err != nil {
		sendErr(w, http.StatusInternalServerError, err.Error())
		return
	}
	w.Write(jsonResponse)
}

func (a *App) allUserTexts(w http.ResponseWriter, r *http.Request) {
	var response AllTextsResponse
	session, err := cookieStore.Get(r, cookie)
	if err != nil {
		sendErr(w, http.StatusInternalServerError, err.Error())
		return
	}

	userId := session.Values["user"]
	if userId == nil {
		sendErr(w, http.StatusUnauthorized, "Not logged in")
		return
	}
	texts := allUserTexts(a.db, userId.(string))
	response.TextListings = texts
	jsonResponse, err := json.Marshal(response)
	if err != nil {
		sendErr(w, http.StatusInternalServerError, err.Error())
		return
	}
	w.Write(jsonResponse)
}

func sendErr(w http.ResponseWriter, code int, message string) {
	resp, _ := json.Marshal(map[string]string{"error": message})
	http.Error(w, string(resp), code)
}

//getting IP address for postText function
func GetIP(r *http.Request) string {
	forwarded := r.Header.Get("X-FORWARDED-FOR")
	if forwarded != "" {
		return forwarded
	}
	return r.RemoteAddr
}

func (a *App) deleteText(w http.ResponseWriter, r *http.Request) {
	var req getTextRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		sendErr(w, http.StatusBadRequest, "ID not sent properly")
	}
	isDelete := deleteText(a.db, req.Id)
	log.Println(isDelete)
	if isDelete {
		fmt.Println("Paste Deleted")
	} else {
		log.Print("app.go Could not delete")
	}
}
