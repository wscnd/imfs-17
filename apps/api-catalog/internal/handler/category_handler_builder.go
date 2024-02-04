package handler

import "github.com/wscnd/nx-imfs-17/catalog/internal/service"

type CategoryHandler struct {
	CategoryService *service.CategoryService
}

type categoryHandlerOpts func(*CategoryHandler) *CategoryHandler

func WithCategoryService(categoryService *service.CategoryService) categoryHandlerOpts {
	return func(webCategoryHandler *CategoryHandler) *CategoryHandler {
		webCategoryHandler.CategoryService = categoryService
		return webCategoryHandler
	}
}

func categoryHandlerBuilder(options ...categoryHandlerOpts) *CategoryHandler {
	webCategoryHandler := &CategoryHandler{}

	for _, option := range options {
		webCategoryHandler = option(webCategoryHandler)
	}

	return webCategoryHandler
}

func NewCategoryHandler(categoryService *service.CategoryService) *CategoryHandler {
	return categoryHandlerBuilder(
		WithCategoryService(categoryService),
	)
}
