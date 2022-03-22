import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Person } from './persontype';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.css']
})
export class TestpageComponent implements OnInit {
  people: Person[] =[];
  public userDetails: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPeople();

    const storage = localStorage.getItem('google_auth');
    if (storage) {
      this.userDetails = JSON.parse(storage);
    } else {
      this.signOut();
    }
  }

  signOut(): void {
    localStorage.removeItem('google_auth');
    this.router.navigateByUrl('/login');
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
