package database

import (
	"database/sql"
	"fmt"
	"os"
	"sync"

	_ "github.com/go-sql-driver/mysql"
)

var (
	connection *sql.DB
	once       sync.Once
)

func Must() (*sql.DB, func()) {
	once.Do(func() {
		dbType := "mysql"
		dbURL := os.Getenv("MYSQL_CATALOG_DB")
		conn, err := sql.Open(dbType, dbURL)
		if err != nil {
			panic(err)
		}

		if err := conn.Ping(); err != nil {
			panic(fmt.Errorf("failed to ping database: %w", err))
		}

		connection = conn
	})
	cleanup := func() {
		if err := connection.Close(); err != nil {
			print(err)
		}
	}

	return connection, cleanup
}
