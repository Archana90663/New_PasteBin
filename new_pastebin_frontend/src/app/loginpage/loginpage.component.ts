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
  socialUser!: SocialUser;
  isLoggedin: boolean = false;  
  
  constructor(
    private formBuilder: FormBuilder, 
    private socialAuthService: SocialAuthService,
    private router: Router
  ) { }

  ngOnInit() {
    /*
    // init the react form object
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });    
    
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      console.log("User:" + this.socialUser);
    });*/
  }

  // Initial implicite flow using OAuth2 protocol
  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      localStorage.setItem('google_auth', JSON.stringify(data));
      this.router.navigateByUrl('/testpage').then();
    });
      //.then(() => this.router.navigateByUrl('/loginpage'));
  }

  // Logout the current session
  logOut(): void {
    this.socialAuthService.signOut();
  }

}
