package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type Todo struct {
	Id   int    `json:"id"`
	Body string `json:"body"`
}

func TodoIndex(w http.ResponseWriter, r *http.Request) {
	todos := []Todo{
		Todo{Id: 1000, Body: "awesome todo"},
		Todo{Id: 1001, Body: "other cool todo"},
		Todo{Id: 1002, Body: "yay todo"},
		Todo{Id: 1003, Body: "ok todo"},
	}
	b, err := json.Marshal(todos)
	if err != nil {
		log.Printf("failed to marshal todos, error: %v", err)
		return
	}
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	w.Write(b)
}

func main() {
	http.HandleFunc("/todos", TodoIndex)
	http.ListenAndServe(":8081", nil)
}
