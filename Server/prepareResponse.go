package main

import (
	"gorm.io/gorm"
)

type Response struct {
	Persons []Person `json:"persons"`
}

type Person struct {
	Id        int    `json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}

func allPersons(db *gorm.DB) []Person {
	var persons []Person
	err := db.Find(&persons).Error
	if err != nil {
		panic("Could not fetch from db")
	}
	var person Person
	person.Id = 10
	person.FirstName = "Issac"
	person.LastName = "Newton"
	persons = append(persons, person)

	person.Id = 22
	person.FirstName = "Albert"
	person.LastName = "Einstein"
	persons = append(persons, person)
	return persons
}
