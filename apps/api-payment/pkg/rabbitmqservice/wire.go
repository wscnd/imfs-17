//go:build wireinject
// +build wireinject
package rabbitmqservice

import (
	"github.com/google/wire"
	"github.com/wscnd/nx-imfs-17/payment/pkg/rabbitmqinit"
)

func Init() (*RabbitMqService, func()) {
	wire.Build(
		rabbitmqinit.Init,
    Must,
	)
	return nil, nil
}
