package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"

	amqp "github.com/rabbitmq/amqp091-go"
	"github.com/wscnd/nx-imfs-17/payment/internal/models"
	"github.com/wscnd/nx-imfs-17/payment/pkg/rabbitmqservice"
)

func main() {
	ctx := context.Background()

	rmqs, cleanup := rabbitmqservice.Init()
	defer cleanup()

	msgs := make(chan amqp.Delivery)
	go rmqs.Consume(ctx, msgs)

	for msg := range msgs {
		msg.Ack(false)
		publishingErr := "publishing message error"

		var or models.OrderRequest
		err := json.Unmarshal(msg.Body, &or)
		if err != nil {
			errMsg := fmt.Sprintf("%s: %s=%s", "cant unmarshal order", err.Error(), msg.Body)
			slog.Error(errMsg)

			if err = rmqs.Publish(ctx, []byte(errMsg), true); err != nil {
				slog.Error(publishingErr, err.Error(), "")
				ctx.Done()
				break
			}

			continue
		}

		slog.Info("incoming order with", "values", or)

		r, err := or.ProcessOrder()
		if err != nil {
			errMsg := fmt.Sprintf("%s: %s=%s", "cant process order", err.Error(), msg.Body)
			slog.Error(errMsg)

			if err = rmqs.Publish(ctx, []byte(errMsg), true); err != nil {
				slog.Error(publishingErr, err.Error(), "")
				ctx.Done()
				break
			}

			continue
		}

		body, err := json.Marshal(&r)
		if err != nil {
			errMsg := fmt.Sprintf("%s: %s=%s", "cant marshall order", err.Error(), (body))
			slog.Error(errMsg)

			if err = rmqs.Publish(ctx, []byte(errMsg), true); err != nil {
				slog.Error(publishingErr, err.Error(), string(body))
				ctx.Done()
				break
			}

			continue
		}

		slog.Info("publishing", "message", string(body))

		if err = rmqs.Publish(ctx, body, false); err != nil {
			errMsg := fmt.Sprintf("%s: %s=%s", "publishing message", err.Error(), (body))
			slog.Error(errMsg)
			ctx.Done()
			break
		}

		slog.Info("published", "message", string(body))
	}

	fmt.Printf("payment service ended")
}
