import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.css']
})
export class TestpageComponent implements OnInit {

  //edit

  getRequest(): Observable<any>{
    return this.http.get('http://localhost:8080/test');
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
   
  }

}
