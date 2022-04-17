import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from "@angular/material/snack-bar";
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
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
  ) { }


  ngOnInit() {
    var loggedInStatus = JSON.parse(localStorage.getItem('loggedInStatus') || 'false');
    console.log(loggedInStatus);
    if(loggedInStatus === true){
      this.isLoggedin = true;
      this.socialUser = JSON.parse(localStorage.getItem('user') || '{}');
      console.log(this.socialUser);
    }
    else{
      this.isLoggedin = false;
    }
    // this.socialAuthService.authState.subscribe(user=>{
    //   this.socialUser = user;
    //   this.isLoggedin = true;
    //   localStorage.setItem('userID', this.socialUser.id);
    // });
    localStorage.setItem('userID', this.socialUser.id);

  }  

  public loginWithGoogle(): void{
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe(user =>{
      this.socialUser = user;
      localStorage.setItem('user', JSON.stringify(this.socialUser));
      console.log("ID: " + this.socialUser.id);

      let headers = new HttpHeaders({'Content-Type': 'application/json'});
    
      this.httpClient.post<any>("http://localhost:8080/api/login", {"idToken": this.socialUser.idToken}, {headers: headers, withCredentials: true}).subscribe(
        res=>{
          console.log("logged: " + res);
        },
        error => {
          if(error.status == 401){
            this.router.navigateByUrl('/pageaccessdenied');
          } else if(error.status == 400){
            this.showMessage(error.error.error)
          } else if(error.status == 500){
            this.showMessage(error.error.error)
          } else if(error.status == 500){
            this.showMessage(error.error.error)
          }
        }
      );
      this.httpClient.get<any>("http://localhost:8080/api/verifyLogin", {withCredentials:true}).subscribe(
        response=>{
          console.log("response: " + response.loggedIn);
          window.location.reload();

        },
        error => {
          if(error.status == 401){
            this.router.navigateByUrl('/pageaccessdenied');
          } else if(error.status == 400){
            this.showMessage(error.error.error)
          } else if(error.status == 500){
            this.showMessage(error.error.error)
          }
        }
      );
      
    });
    
    
    localStorage.setItem('loggedInStatus', 'true');
    console.log("ID: " + localStorage.getItem('userID'));
    // this.isLoggedin = true;
    this.router.navigateByUrl('/');
  }

  showMessage(message: string) {
    this.snackBar.open(message, "OK");
    console.log("snackbar user id: " + sessionStorage.getItem('userID'));
  }

  logOut(): void {
    this.socialAuthService.signOut();
    this.isLoggedin = false;
    this.httpClient.get('http://localhost:8080/api/logout')
    localStorage.removeItem('userID');
    localStorage.setItem('loggedInStatus', 'false');
    localStorage.removeItem('user');
    console.log("ID: " + localStorage.getItem('userID'));
    this.router.navigateByUrl('/');
    window.location.reload();
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

  TestUserValid(): boolean{
    this.socialUser = JSON.parse(localStorage.getItem('user') || '{}');
    if(this.socialUser != undefined){
      return true;
    }
    return false;
  }

  TestUserID(): boolean{
    var id = localStorage.getItem('userID');
    if(id != undefined){
      return true;
    }
    return false;
  }


}