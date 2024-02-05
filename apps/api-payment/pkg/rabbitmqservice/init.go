package rabbitmqservice

import (
	"log/slog"
	"os"

	amqp "github.com/rabbitmq/amqp091-go"
)

type RabbitMqService struct {
	chann    *amqp.Channel
	exchange string
	qSucess  string
	rkSucess string
	rkFailed string
}

type opts func(*RabbitMqService) *RabbitMqService

func WithConnection(c *amqp.Channel) opts {
	return func(s *RabbitMqService) *RabbitMqService {
		s.chann = c
		return s
	}
}

func WithQueues(q string) opts {
	return func(s *RabbitMqService) *RabbitMqService {
		if q == "" {
			panic("q is empty")
		}
		slog.Info("rabbitmqservice", "queue", q)
		s.qSucess = q
		return s
	}
}

func WithExchange(e string) opts {
	return func(s *RabbitMqService) *RabbitMqService {
		if e == "" {
			panic("exchange is empty")
		}

		s.exchange = e
		slog.Info("rabbitmqservice", "exchange", e)
		return s
	}
}

func WithRoutingKeys(rkSuccess, rkFailed string) opts {
	return func(s *RabbitMqService) *RabbitMqService {
		if rkSuccess == "" || rkFailed == "" {
			panic("check routing keys")
		}

		s.rkSucess = rkSuccess
		s.rkFailed = rkFailed
		slog.Info("rabbitmqservice", "routingKey", rkSuccess)
		return s
	}
}

func New(options ...opts) *RabbitMqService {
	rabbitMqService := &RabbitMqService{}

	for _, option := range options {
		rabbitMqService = option(rabbitMqService)
	}
	return rabbitMqService
}

func Must(c *amqp.Channel) *RabbitMqService {
	return New(
		WithConnection(c),
		WithQueues(os.Getenv("RABBITMQ_QUEUE_ORDERS")),
		WithExchange(os.Getenv("RABBITMQ_EXCHANGE_ORDERS")),
		WithRoutingKeys(os.Getenv("RABBITMQ_RK_ORDER_UPDATED"), os.Getenv("RABBITMQ_RK_ORDER_FAILED")),
	)
}
