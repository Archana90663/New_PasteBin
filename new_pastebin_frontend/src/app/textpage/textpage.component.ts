import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paste } from '../types/pastestype';
import { ActivatedRoute, Router } from '@angular/router';
import getExpireInText from '../util/getExireIn'

@Component({
  selector: 'app-textpage',
  templateUrl: './textpage.component.html',
  styleUrls: ['./textpage.component.css']
})
export class TextpageComponent implements OnInit {
  paste!: Paste;
  getExpireIn = getExpireInText
  map = new Map();
  
  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('map') === null){
      this.map = new Map();
    }
    else{
      let jsonObject = JSON.parse(localStorage.getItem('map') || '{}');
      for (var value in jsonObject) {  
         this.map.set(value,jsonObject[value])  
      }
    }
    console.log(typeof(this.map));
    console.log(this.map);
    this.getText()
  }
  getText(){
    console.log("storage ID: " + localStorage.getItem('userID'));
    this.activatedRoute.queryParams.subscribe(params => {
      let id = params['id'];
    //   this.httpClient.post<any>("http://localhost:8080/api/getText",{"id":id}, {withCredentials: true}).subscribe(
    //   response => {
    //     this.paste = response
    //     console.log(this.paste)
    //   },
    //   error => {
    //     if(error.status == 404){
    //       this.router.navigateByUrl('/404');
    //     }
    //     else if(error.status == 410){
    //       this.router.navigateByUrl('/expiredpage');
    //     }
    //   }
    // );
    this.paste = this.map.get(id);
    console.log(this.paste);
  });
    
    }


    deleteText(){
      this.activatedRoute.queryParams.subscribe(params => {
        let id = params['id'];
        this.httpClient.post<any>("http://localhost:8080/api/deletePost",{"id":id}).subscribe(
        response => {
          this.paste = response
          console.log(this.paste)
        },
        error => {
          if(error.status == 404){
            this.router.navigateByUrl('/404');
          }
          else if(error.status == 410){
            this.router.navigateByUrl('/expiredpage');
          }
        }
      );
    });
      
      }
}

