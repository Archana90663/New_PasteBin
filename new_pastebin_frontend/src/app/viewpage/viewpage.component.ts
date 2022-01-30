import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Text } from './text';

@Component({
  selector: 'app-viewpage',
  templateUrl: './viewpage.component.html',
  styleUrls: ['./viewpage.component.css']
})
export class ViewpageComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getText(): Observable<Text[]>{
    console.log('http://localhost:8080/api/getText');
    return this.http.get<Text[]>('http://localhost:8080/api/getText');
  }
  addText(text: Text): Observable<any>{
    const headers = {'content-type': 'application/json'}
    const body = JSON.stringify(text);
    console.log(body);
    return this.http.post('http://localhost:8080/api/getText', body, {'headers':headers});
  }

}
