package repository

import (
	"database/sql"

	"github.com/wscnd/nx-imfs-17/catalog/internal/models"
)

type ProductRepository struct {
	db *sql.DB
}

type productDBOpts func(*ProductRepository) *ProductRepository

func WithProductDB(db *sql.DB) productDBOpts {
	return func(productDB *ProductRepository) *ProductRepository {
		productDB.db = db
		return productDB
	}
}

func productRepositoryBuilder(options ...productDBOpts) *ProductRepository {
	productDB := &ProductRepository{}

	for _, option := range options {
		productDB = option(productDB)
	}

	return productDB
}

func NewProductRepository(db *sql.DB) *ProductRepository {
	return productRepositoryBuilder(WithProductDB(db))
}

func (pdb *ProductRepository) CreateOne(p *models.Product) (*models.Product, error) {
	_, err := pdb.db.Exec(`
  INSERT INTO products (id, name, description, price, category_id, image_url)
   values (?, ?, ?, ?, ?, ?)`,
		p.ID, p.Name, p.Description, p.Price, p.CategoryID, p.ImageURL)
	if err != nil {
		return nil, err
	}

	return p, nil
}

func (pdb *ProductRepository) GetMany() ([]*models.Product, error) {
	rows, err := pdb.db.Query(`
  SELECT
  id, name, description, price, category_id, image_url
   from products`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var ps []*models.Product
	for rows.Next() {
		var p models.Product
		if err := rows.Scan(
			&p.ID,
			&p.Name,
			&p.Description,
			&p.Price,
			&p.CategoryID,
			&p.ImageURL,
		); err != nil {
			return nil, err
		}
		ps = append(ps, &p)
	}
	return ps, nil
}

func (pdb *ProductRepository) GetOne(id string) (*models.Product, error) {
	var p models.Product
	row := pdb.db.QueryRow(`
  SELECT
  id, name, description, price, category_id, image_url
   from products
    WHERE id= ? `,
		id)

	err := row.Scan(&p.ID, &p.Name, &p.Description, &p.Price, &p.CategoryID, &p.ImageURL)
	if err != nil {
		return nil, err
	}

	return &p, nil
}

func (pdb *ProductRepository) GetOneByCategoryID(cID string) ([]*models.Product, error) {
	rows, err := pdb.db.Query(`
  SELECT
  id, name, description, price, category_id, image_url
   from products
    WHERE category_id= ? `, cID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var ps []*models.Product
	for rows.Next() {
		var p models.Product
		if err := rows.Scan(
			&p.ID,
			&p.Name,
			&p.Description,
			&p.Price,
			&p.CategoryID,
			&p.ImageURL,
		); err != nil {
			return nil, err
		}
		ps = append(ps, &p)
	}
	return ps, nil
}
