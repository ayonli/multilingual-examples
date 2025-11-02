package main

import (
	"errors"
	"fmt"
)

var ErrDivisionByZero = errors.New("division by zero")

func main() {
	result, err := divide(10, 0)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Printf("The result is: %d\n", result)
}

func divide[T int | int16 | int32 | int64 | int8 | float32 | float64](a T, b T) (T, error) {
	if b == 0 {
		return 0, ErrDivisionByZero
	}

	return a / b, nil
}
