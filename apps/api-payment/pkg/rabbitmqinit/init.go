package rabbitmqinit

import (
	"os"
	"sync"

	amqp "github.com/rabbitmq/amqp091-go"
)

var (
	channel *amqp.Channel
	once    sync.Once
)

func Init() (*amqp.Channel, func()) {
	once.Do(func() {
		rabbitURL := os.Getenv("RABBITMQ_URI")
		conn, err := amqp.Dial(rabbitURL)
		if err != nil {
			panic(err)
		}
		ch, err := conn.Channel()
		if err != nil {
			panic(err)
		}
		channel = ch
	})

	cleanup := func() {
		if err := channel.Close(); err != nil {
			print(err)
		}
	}

	return channel, cleanup
}
