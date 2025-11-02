package models

type Author struct {
	*User `tstype:",extends,required"`

	Biography string `json:"biography"`
	Publisher string `json:"publisher"`
}
