// Code generated by Wire. DO NOT EDIT.

//go:generate go run github.com/google/wire/cmd/wire
//go:build !wireinject
// +build !wireinject

package handler

import (
	"github.com/wscnd/nx-imfs-17/catalog/internal/database"
	"github.com/wscnd/nx-imfs-17/catalog/internal/repository"
	"github.com/wscnd/nx-imfs-17/catalog/internal/service"
)

// Injectors from wire.go:

func InitializeProductHandler() (*ProductHandler, func()) {
	db, cleanup := database.Must()
	productRepository := repository.NewProductRepository(db)
	productService := service.NewProductService(productRepository)
	productHandler := NewProductHandler(productService)
	return productHandler, func() {
		cleanup()
	}
}

func InitializeCategoryHandler() (*CategoryHandler, func()) {
	db, cleanup := database.Must()
	categoryRepository := repository.NewCategoryRepository(db)
	categoryService := service.NewCategoryService(categoryRepository)
	categoryHandler := NewCategoryHandler(categoryService)
	return categoryHandler, func() {
		cleanup()
	}
}
