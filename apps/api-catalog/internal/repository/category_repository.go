package repository

import (
	"database/sql"

	"github.com/wscnd/nx-imfs-17/catalog/internal/models"
)

type CategoryRepository struct {
	db *sql.DB
}

type categoryDBOpts func(*CategoryRepository) *CategoryRepository

func WithCategoryDB(db *sql.DB) categoryDBOpts {
	return func(categoryDB *CategoryRepository) *CategoryRepository {
		categoryDB.db = db
		return categoryDB
	}
}

func categoryRepositoryBuilder(options ...categoryDBOpts) *CategoryRepository {
	categoryDB := &CategoryRepository{}

	for _, option := range options {
		categoryDB = option(categoryDB)
	}

	return categoryDB
}

func NewCategoryRepository(db *sql.DB) *CategoryRepository {
	return categoryRepositoryBuilder(WithCategoryDB(db))
}

func (cdb *CategoryRepository) GetMany() ([]*models.Category, error) {
	rows, err := cdb.db.Query("SELECT id, name from categories")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var cs []*models.Category
	for rows.Next() {
		var c models.Category
		if err := rows.Scan(&c.ID, &c.Name); err != nil {
			return nil, err
		}
		cs = append(cs, &c)
	}

	return cs, nil
}

func (cdb *CategoryRepository) CreateOne(c *models.Category) (*models.Category, error) {
	_, err := cdb.db.Exec(`
	INSERT INTO categories (id, name)
	 VALUES (?,?)`,
		c.ID, c.Name)
	if err != nil {
		return nil, err
	}

	return c, nil
}

func (cdb *CategoryRepository) GetOne(id string) (*models.Category, error) {
	var c models.Category
	err := cdb.db.QueryRow("SELECT * from categories WHERE id = ?", id).Scan(&c.ID, &c.Name)
	if err != nil {
		return nil, err
	}

	return &c, nil
}
