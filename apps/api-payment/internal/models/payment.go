package models

import "encoding/json"

type PaymentStatus uint8

const (
	Pending PaymentStatus = iota
	Paid
	Failed
)
func (s PaymentStatus) MarshalJSON() ([]byte, error) {
    return json.Marshal(s.String())
}

func (s PaymentStatus) String() string {
	switch s {
	case Paid:
		return "paid"
	case Failed:
		return "failed"
	}

	return "pending"
}
