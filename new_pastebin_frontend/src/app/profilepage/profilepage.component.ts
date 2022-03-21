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
    this.socialAuthService.authState.subscribe(user =>{
      this.socialUser = user;
      console.log("user: " + user.email);
      this.isLoggedin = true;
      console.log("LOGGED: " + this.isLoggedin);
    });
  }

}
