import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  loginForm: FormGroup | undefined;
  // socialUser!: SocialUser;
  public socialUser: SocialUser = new SocialUser;
  isLoggedin: boolean = false;  
  
  constructor(
    private formBuilder: FormBuilder, 
    private socialAuthService: SocialAuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.socialAuthService.authState.subscribe(user =>{
      this.socialUser = user;
      console.log("user: " + user.email);
      this.isLoggedin = true;
      console.log("LOGGED: " + this.isLoggedin);
    })
  }

  // loginWithGoogle(): void {
  //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
  //     localStorage.setItem('google_auth', JSON.stringify(data));
  //     this.isLoggedin = true;
  //     this.router.navigateByUrl('/').then();
  //     console.log("LOGGED: " + this.isLoggedin);
  //   });
  // }

  public loginWithGoogle(): void{
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.router.navigateByUrl('/');
  }

  logOut(): void {
    this.socialAuthService.signOut();
    this.isLoggedin = false;
  }

}