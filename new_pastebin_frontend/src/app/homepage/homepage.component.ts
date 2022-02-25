import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paste } from '../types/pastestype';
import getExpireInText from '../util/getExireIn'
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  pastes: Paste[] =[];
  searchTerm : string='';
  term: string = '';
  getExpireIn = getExpireInText
  constructor(
    private httpClient: HttpClient
    ) { }

  ngOnInit(): void {
    this.getPastes();
  }

  getPastes(){
    this.httpClient.get<any>("http://localhost:8080/api/allTexts").subscribe(
      response => {
        this.pastes = response.texts
        console.log(this.pastes)
      }
    );
  }
  

}
