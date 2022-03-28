import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})

export class LoginpageComponent implements OnInit {

  loginForm: FormGroup | undefined;
  public socialUser: SocialUser = new SocialUser;
  isLoggedin: boolean = false;  

  
  constructor(
    private formBuilder: FormBuilder, 
    private socialAuthService: SocialAuthService,
    private router: Router,
    private httpClient: HttpClient,
  ) { }


  ngOnInit() {
    this.socialAuthService.authState.subscribe(user=>{
      this.socialUser = user;
      this.isLoggedin = true;
      localStorage.setItem('userID', user.id);
    });
      
  }  

  public loginWithGoogle(): void{
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe(user =>{
      this.socialUser = user;
      console.log("ID: " + this.socialUser.id);

      let headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient.post<any>("http://localhost:8080/api/signup", {"idToken": this.socialUser.idToken, "handle":"blah"}, {headers: headers, withCredentials: true}).subscribe(
        res=>{
          console.log("signedup: " + res);
        }
      );
      this.httpClient.post<any>("http://localhost:8080/api/login", {"idToken": this.socialUser.idToken}, {headers: headers, withCredentials: true}).subscribe(
        res=>{
          console.log("logged: " + res);
        }
      );
      this.httpClient.get<any>("http://localhost:8080/api/verifyLogin", {withCredentials:true}).subscribe(
        response=>{
          console.log("response: " + response.loggedIn);
        }
      );
    });
    
    this.router.navigateByUrl('/');
    this.isLoggedin = true;

  }

  logOut(): void {
    this.socialAuthService.signOut();
    this.isLoggedin = false;
    this.httpClient.get('http://localhost:8080/api/logout')
    // localStorage.removeItem('userID');

  }

  Testlogin(): SocialUser{
    this.loginWithGoogle();
    this.isLoggedin = true;
    return this.socialUser;
  }

  TestBooleanLogin(): boolean{
    this.loginWithGoogle();
    this.isLoggedin = true;
    return this.isLoggedin;
  }

  TestBooleanLogout(): boolean{
    this.socialAuthService.signOut();
    this.isLoggedin = false;
    return this.isLoggedin;
  }


}