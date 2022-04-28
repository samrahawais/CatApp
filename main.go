package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

func apiResponse(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	b, err := ioutil.ReadFile("public/catdata.json") // just pass the file name
	if err != nil {
		fmt.Print(err)
	}
	w.Write([]byte(b))
}

func main() {
	fs_images := http.FileServer(http.Dir("./public/images"))
	fs := http.FileServer(http.Dir("./front-end/build"))
	http.HandleFunc("/cats", apiResponse)
	http.Handle("/images/", http.StripPrefix("/images/", fs_images))
	http.Handle("/", fs)

	log.Println("Listening on :8080...")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}
