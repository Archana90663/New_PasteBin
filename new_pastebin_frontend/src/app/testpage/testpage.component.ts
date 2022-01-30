import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Person } from './persontype';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.css']
})
export class TestpageComponent implements OnInit {
  people: Person[] =[];
  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.getPeople();
  }
  getPeople(){
    this.httpClient.get<any>("http://localhost:8080/test").subscribe(
      response => {
        this.people = response.persons
        console.log(this.people)
      }
    );
  }
}
