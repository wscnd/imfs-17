package models

import "errors"

type OrderRequest struct {
	OrderID  string  `json:"order_id"`
	CardHash string  `json:"card_hash"`
	Total    float64 `json:"total"`
}

func NewOrderRequest(orderID, cardHash string, total float64) *OrderRequest {
	return &OrderRequest{
		OrderID:  orderID,
		CardHash: cardHash,
		Total:    total,
	}
}

func (o *OrderRequest) Validate() error {
	if o.OrderID == "" {
		return errors.New("order_id is required")
	}

	if o.CardHash == "" {
		return errors.New("card_hash is required")
	}

	if o.Total <= 0 {
		return errors.New("total is required")
	}

	return nil
}

func (o *OrderRequest) ProcessOrder() (*OrderResponse, error) {
	if err := o.Validate(); err != nil {
		return nil, err
	}

	or := NewOrderResponse(o.OrderID, Failed)
	if o.Total > 2500 {
		or.Status = Paid
	} else {
		or.Status = Failed
	}

	return or, nil
}
