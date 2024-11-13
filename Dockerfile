# Используйте образ Go для вашего приложения
FROM golang:latest

# Установка рабочей директории внутри образа
WORKDIR /app

# Копирование файлов go.mod и go.sum в контейнер
COPY cmd/go.mod cmd/go.sum ./

# Запуск команды go mod download для загрузки зависимостей
RUN go mod download

# Копирование всех файлов в контейнер
COPY . .

# Порт, на котором ваше приложение слушает
EXPOSE 8080

# Запуск вашего приложения
CMD ["go", "run", "cmd/main.go"]