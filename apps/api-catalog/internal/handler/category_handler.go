package handler

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/wscnd/nx-imfs-17/catalogapi/internal/models"
)

func (ch *CategoryHandler) CreateOne(w http.ResponseWriter, r *http.Request) {
	var c models.Category
	if err := json.NewDecoder(r.Body).Decode(&c); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	nc, err := ch.CategoryService.CreateOne(c.Name)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return

	}

	json.NewEncoder(w).Encode(nc)
}

func (ch *CategoryHandler) FindById(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	fmt.Println(id)
	if id == "" {
		http.Error(w, errors.New("id is required").Error(), http.StatusBadRequest)
		return
	}

	c, err := ch.CategoryService.GetOne(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(c)
}

func (ch *CategoryHandler) FindAll(w http.ResponseWriter, r *http.Request) {
	cs, err := ch.CategoryService.GetMany()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(cs)
}
