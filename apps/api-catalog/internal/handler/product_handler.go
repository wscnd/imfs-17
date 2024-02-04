package handler

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/wscnd/nx-imfs-17/catalog/internal/models"
)

func (ph *ProductHandler) CreateOne(w http.ResponseWriter, r *http.Request) {
	var p models.Product
	if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	nc, err := ph.ProductService.CreateOne(
		p.Name, p.Description, p.CategoryID, p.ImageURL, p.Price,
	)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(nc)
}

func (ph *ProductHandler) FindById(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if id == "" {
		http.Error(w, errors.New("id is required").Error(), http.StatusBadRequest)
		return
	}

	c, err := ph.ProductService.GetOne(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(c)
}

func (ph *ProductHandler) FindAll(w http.ResponseWriter, r *http.Request) {
	cs, err := ph.ProductService.GetMany()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(cs)
}

func (ph *ProductHandler) GetOneByCategoryID(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "categoryID")
	if id == "" {
		http.Error(w, errors.New("id is required").Error(), http.StatusBadRequest)
		return
	}

	cs, err := ph.ProductService.GetOneByCategoryID(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(cs)
}


