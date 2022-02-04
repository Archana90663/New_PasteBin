import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paste } from './pastestype';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  pastes: Paste[] =[];

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
  getExpireIn(expire_at: string): string{
    var secondsDiff = (Date.parse(expire_at) - (new Date()).getTime())/1000
    if (secondsDiff > 86400)  { 
      return Math.floor(secondsDiff/86400) + ' Days'
     }
     if (secondsDiff > 3600)  { 
      return Math.floor(secondsDiff/3600) + ' Hours'
     }
     if (secondsDiff > 60)  { 
      return Math.floor(secondsDiff/60) + ' Minutes'
     }
     if (secondsDiff > 0) { 
      return secondsDiff + ' Seconds'
     }
    return "jj"
  }

}
