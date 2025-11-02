package models

type User struct {
	Email         string `json:"email"`
	Name          string `json:"name"`
	Gender        int    `json:"gender"`
	Age           int    `json:"age"`
	Birthday      string `json:"birthday"`
	Country       string `json:"country"`
	Province      string `json:"province"`
	City          string `json:"city"`
	DetailAddress string `json:"detail_address"`
}
