import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paste } from '../types/pastestype';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar";
import getExpireInText from '../util/getExireIn'
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-textpage',
  templateUrl: './textpage.component.html',
  styleUrls: ['./textpage.component.css']
})
export class TextpageComponent implements OnInit {
  paste!: Paste;
  public socialUser: SocialUser = new SocialUser;
  isLoggedin: boolean = false;
  getExpireIn = getExpireInText
  map = new Map();
  
  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private socialAuthService: SocialAuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe(user=>{
      this.socialUser = user;
      this.isLoggedin = true;
      // localStorage.setItem('userID', this.socialUser.id);
    });

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
      this.httpClient.post<any>("http://localhost:8080/api/getText",{"id":id}, {withCredentials: true}).subscribe(
      response => {
        if(this.map.has(id)){
          console.log("map has paste");
          this.paste = this.map.get(id);
        }
        else{
          this.paste = response;
        }
        // console.log(this.paste)
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
    console.log(this.paste);
  });
    
    }


    deleteText(){
      this.activatedRoute.queryParams.subscribe(params => {
        let id = params['id'];
        console.log(id);
        this.httpClient.post<any>("http://localhost:8080/api/deleteText",{"id":id}).subscribe(
          response => {
          console.log(response)
          this.showMessage("TEXT DELETED")
          this.router.navigateByUrl('/');
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

      showMessage(message: string) {
        this.snackBar.open(message, "OK");
        console.log("snackbar user id: " + sessionStorage.getItem('userID'));
      }
}

