package main

import (
	"fmt"
	"github.com/julienschmidt/httprouter"
	"html/template"
	"net/http"
	"path/filepath"
)

func Home(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	home := filepath.Join("public", "index.html")

	tmpl, err := template.ParseFiles(home)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}

	err = tmpl.ExecuteTemplate(w, "home", nil) //data - передаваемый объект в шаблон
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}
}

func routes(r *httprouter.Router) {
	//путь к папке со внешними файлами: html, js, css, изображения и т.д.
	r.ServeFiles("/public/*filepath", http.Dir("public"))
	//что следует выполнять при входящих запросах указанного типа и по указанному адресу
	r.GET("/", Home)

	fmt.Println("1Сервер запущен. Перейдите по адресу http://localhost:8080/")
	err := http.ListenAndServe(":8080", r)
	if err != nil {
		panic(err)
	}
}

func handleRequest() {
	r := httprouter.New()
	routes(r)
}

func main() {
	handleRequest()
}
