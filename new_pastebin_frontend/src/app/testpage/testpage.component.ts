import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IPerson } from '../person';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.css']
})
export class TestpageComponent implements OnInit {

  data = {};

  getRequest(){
    // this.http.get('http://localhost:8080/test').subscribe(result => this.data = result);
    // console.log(this.data);
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<IPerson[]>('http://localhost:8080/test').subscribe(res => this.data = res);
    console.log(this.data);
  }

}
