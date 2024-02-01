package handler

import "github.com/wscnd/nx-imfs-17/catalogapi/internal/service"

type ProductHandler struct {
	ProductService *service.ProductService
}

type ProductHandlerOption func(*ProductHandler) *ProductHandler

func WithProductService(productService *service.ProductService) ProductHandlerOption {
	return func(productHandler *ProductHandler) *ProductHandler {
		productHandler.ProductService = productService
		return productHandler
	}
}

func productHandlerBuilder(options ...ProductHandlerOption) *ProductHandler {
	productHandler := &ProductHandler{}

	for _, option := range options {
		productHandler = option(productHandler)
	}

	return productHandler
}

func NewProductHandler(ProductService *service.ProductService) *ProductHandler {
	return productHandlerBuilder(
		WithProductService(ProductService),
	)
}
