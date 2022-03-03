package main

import (
	"embed"
	"encoding/json"
	"io/fs"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/go-co-op/gocron"
	//"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
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
	a.db.AutoMigrate(&Person{}, &Text{})
	s := gocron.NewScheduler(time.UTC)
	s.Every(300).Seconds().Do(removeExpired, a.db)
	s.StartAsync()
	// Add test data into db
	a.db.Create(&Person{Id: 1, FirstName: "fn", LastName: "ln"})

	a.r.HandleFunc("/test", a.test).Methods("GET")
	a.r.HandleFunc("/api/submitText", a.addText).Methods("POST")
	a.r.HandleFunc("/api/allTexts", a.allTexts).Methods("GET")
	a.r.HandleFunc("/api/getText", a.getText).Methods("POST")
	a.r.HandleFunc("/api/getUserInfo", a.getUserInfo).Methods("POST")
	spa := spaHandler{staticFS: static, staticPath: "static", indexPath: "index.html"}
	a.r.PathPrefix("/").Handler(spa)

	//headersOk := handlers.AllowedHeaders([]string{"X-Requested-With"})
	//originsOk := handlers.AllowedOrigins([]string{os.Getenv("ORIGIN_ALLOWED")})
	//methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})
	handler := cors.Default().Handler(a.r)
	log.Fatal(http.ListenAndServe(":8080", handler)) //handlers.CORS(originsOk, headersOk, methodsOk)(a.r)))

}
func (a *App) test(w http.ResponseWriter, r *http.Request) {
	var response Response

	//Retrieve person details
	persons := allPersons(a.db)
	response.Persons = persons

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")

	//convert struct to JSON
	jsonResponse, err := json.Marshal(response)
	if err != nil {
		sendErr(w, http.StatusInternalServerError, err.Error())
		return
	}
	w.Write(jsonResponse)
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
	text := getText(a.db, req.Id)
	if text == nil {
		sendErr(w, http.StatusNotFound, "text not found")
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
func (a *App) getUserInfo(w http.ResponseWriter, r *http.Request) {
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
