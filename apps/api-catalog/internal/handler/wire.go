//go:build wireinject
// +build wireinject

package handler

import (
	"github.com/google/wire"

	"github.com/wscnd/nx-imfs-17/catalogapi/internal/database"
	"github.com/wscnd/nx-imfs-17/catalogapi/internal/repository"
	"github.com/wscnd/nx-imfs-17/catalogapi/internal/service"
)

func InitializeProductHandler() (*ProductHandler, func()) {
	wire.Build(
		database.Must,
		NewProductHandler,
		service.NewProductService,
		repository.NewProductRepository,
	)
	return nil, nil
}

func InitializeCategoryHandler() (*CategoryHandler, func()) {
	wire.Build(
		database.Must,
		NewCategoryHandler,
		service.NewCategoryService,
		repository.NewCategoryRepository,
	)
	return nil, nil
}
