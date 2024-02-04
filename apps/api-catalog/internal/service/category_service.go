package service

import (
	"github.com/wscnd/nx-imfs-17/catalog/internal/models"
	"github.com/wscnd/nx-imfs-17/catalog/internal/repository"
)

type CategoryService struct {
	repository *repository.CategoryRepository
}

type categoryServiceOpts func(*CategoryService) *CategoryService

func WithCategoryDB(categoryDB *repository.CategoryRepository) categoryServiceOpts {
	return func(categoryService *CategoryService) *CategoryService {
		categoryService.repository = categoryDB
		return categoryService
	}
}

func CreateCategoryService(options ...categoryServiceOpts) *CategoryService {
	categoryService := &CategoryService{}

	for _, option := range options {
		categoryService = option(categoryService)
	}

	return categoryService
}

func NewCategoryService(CategoryDB *repository.CategoryRepository) *CategoryService {
	return CreateCategoryService(
		WithCategoryDB(CategoryDB),
	)
}

func (cs *CategoryService) GetMany() ([]*models.Category, error) {
	return cs.repository.GetMany()
}

func (cs *CategoryService) CreateOne(name string) (*models.Category, error) {
	return cs.repository.CreateOne(
		models.NewCategory(name),
	)
}

func (cs *CategoryService) GetOne(id string) (*models.Category, error) {
	return cs.repository.GetOne(id)
}
