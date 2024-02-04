package main

import (
	"fmt"
	"net"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/wscnd/nx-imfs-17/catalog/internal/handler"
)

func main() {
	host := ":8080"
	if err := checkPortAvailable(host); err != nil {
		panic(fmt.Sprintf("PORT %s in use", host))
	}

	c := chi.NewRouter()
	{
		c.Use(middleware.Logger)
		c.Use(middleware.Recoverer)

		c.Use(func(next http.Handler) http.Handler {
			return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
				w.Header().Set("Content-Type", "application/json")
				next.ServeHTTP(w, r)
			})
		})
	}

	ch, cleanCH := handler.InitializeCategoryHandler()
	defer cleanCH()
	{
		c.Get("/category/{id}", ch.FindById)
		c.Get("/category", ch.FindAll)
		c.Post("/category", ch.CreateOne)
	}

	ph, cleanPH := handler.InitializeProductHandler()
	defer cleanPH()
	{
		c.Get("/product/{id}", ph.FindById)
		c.Get("/product/category/{categoryID}", ph.GetOneByCategoryID)
		c.Get("/product", ph.FindAll)
		c.Post("/product", ph.CreateOne)
	}

	fmt.Printf("server is running on port %s", host)

	http.ListenAndServe(host, c)
}

func checkPortAvailable(host string) (err error) {
	server, err := net.Listen("tcp", host)
	if err != nil {
		return err
	}
	server.Close()
	return nil
}
