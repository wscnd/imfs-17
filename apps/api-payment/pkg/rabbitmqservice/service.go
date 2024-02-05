package rabbitmqservice

import (
	"context"
	"fmt"

	amqp "github.com/rabbitmq/amqp091-go"
)

func (r *RabbitMqService) Hello() {
	fmt.Println("Hello from rabbit")
}

func (s *RabbitMqService) Consume(ctx context.Context, out chan amqp.Delivery) error {
	msgs, err := s.chann.ConsumeWithContext(
		ctx,
		s.qSucess,
		s.rkSucess,
		false,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		return err
	}

	for msg := range msgs {
		out <- msg
	}

	return nil
}

func (s *RabbitMqService) Publish(ctx context.Context, body []byte, error bool) error {
	var rk string
	if error {
		rk = s.rkFailed
	} else {
		rk = s.rkSucess
	}

	err := s.chann.PublishWithContext(ctx, s.exchange, rk, false, false, amqp.Publishing{
		ContentType: "text.json",
		Body:        body,
	})
	if err != nil {
		return err
	}

	return nil
}
