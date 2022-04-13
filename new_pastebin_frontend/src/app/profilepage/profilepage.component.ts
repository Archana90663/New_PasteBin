import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {

  public socialUser: SocialUser = new SocialUser;
  isLoggedin: boolean = false; 

  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    var loggedInStatus = JSON.parse(localStorage.getItem('loggedInStatus') || 'false');
    if(loggedInStatus === true){
      this.isLoggedin = true;
      this.socialUser = JSON.parse(localStorage.getItem('user') || '{}');
      console.log(this.socialUser);
    }
    else{
      this.isLoggedin = false;
    }
    // this.socialAuthService.authState.subscribe(user =>{
    //   this.socialUser = user;
    //   console.log("user: " + user.email);
    //   this.isLoggedin = true;
    //   console.log("LOGGED: " + this.isLoggedin);
    // });
  }

  testUserProfile():Boolean{
    this.socialUser = JSON.parse(localStorage.getItem('user') || '{}');
    if(this.socialUser.name != undefined){
      if(this.socialUser.email != undefined){
        if(this.socialUser.photoUrl != undefined){
          return true;
        }
      }
    }
    return false;
  }

}
