package models

type OrderResponse struct {
	OrderID string        `json:"order_id"`
	Status  PaymentStatus `json:"status"`
}

func NewOrderResponse(orderID string, status PaymentStatus) *OrderResponse {
	return &OrderResponse{
		OrderID: orderID,
		Status:  status,
	}
}
