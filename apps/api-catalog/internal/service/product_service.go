package service

import (
	"github.com/wscnd/nx-imfs-17/catalog/internal/models"
	"github.com/wscnd/nx-imfs-17/catalog/internal/repository"
)

type ProductService struct {
	repository *repository.ProductRepository
}

type productServiceOpts func(*ProductService) *ProductService

func WithProductDB(productDB *repository.ProductRepository) productServiceOpts {
	return func(productService *ProductService) *ProductService {
		productService.repository = productDB
		return productService
	}
}

func productServiceBuilder(options ...productServiceOpts) *ProductService {
	productService := &ProductService{}

	for _, option := range options {
		productService = option(productService)
	}

	return productService
}

func NewProductService(ProductDB *repository.ProductRepository) *ProductService {
	return productServiceBuilder(
		WithProductDB(ProductDB),
	)
}

func (ps *ProductService) GetMany() ([]*models.Product, error) {
	return ps.repository.GetMany()
}

func (ps *ProductService) GetOne(id string) (*models.Product, error) {
	return ps.repository.GetOne(id)
}

func (ps *ProductService) GetOneByCategoryID(categoryID string) ([]*models.Product, error) {
	return ps.repository.GetOneByCategoryID(categoryID)
}

func (ps *ProductService) CreateOne(
	name,
	description,
	categoryID,
	imageURL string,
	price float64,
) (*models.Product, error) {
	p := models.NewProduct(name, description, price, categoryID, imageURL)
	return ps.repository.CreateOne(p)
}
