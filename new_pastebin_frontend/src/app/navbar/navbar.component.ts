import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public socialUser: SocialUser = new SocialUser;
  logged:boolean = false;
  userMap = new Map();

  constructor(
    private socialAuthService: SocialAuthService, 
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    var loggedInStatus = JSON.parse(localStorage.getItem('loggedInStatus') || 'false');
    console.log(loggedInStatus);
    if(loggedInStatus === true){
      this.logged = true;
      this.socialUser = JSON.parse(localStorage.getItem('user') || '{}');
      console.log(this.socialUser);
    }
    else{
      this.logged = false;
    }
    // this.socialAuthService.authState.subscribe(user =>{
    //   this.socialUser = user;
    //   if(user != null){
    //     this.logged = true;
    //   }
    //   else{
    //     this.logged = false;
    //   }
    //   localStorage.setItem('userID', this.socialUser.id);
    // });
    localStorage.setItem('userID', this.socialUser.id);


  }

  login() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe(user =>{
      this.socialUser = user; 
      
      console.log("ID: " + this.socialUser.id);

      let headers = new HttpHeaders({'Content-Type': 'application/json'});

      this.httpClient.post<any>("http://localhost:8080/api/login", {"idToken": this.socialUser.idToken}, {headers: headers, withCredentials: true}).subscribe(
        res=>{
          this.httpClient.get<any>("http://localhost:8080/api/verifyLogin", {withCredentials:true}).subscribe(
        response=>{
          console.log("response: " + response.loggedIn);
          if(response.loggedIn){
            localStorage.setItem('loggedInStatus', 'true');
            localStorage.setItem('user', JSON.stringify(this.socialUser));
            localStorage.setItem('userID', this.socialUser.id);
            this.logged = true
            console.log("ID: " + localStorage.getItem('userID'));
          }else{
            localStorage.setItem('loggedInStatus', 'false');
            localStorage.removeItem('user');
            localStorage.removeItem('userID');
            this.logged = false
          }
        },
        error => {
          localStorage.setItem('loggedInStatus', 'false');
            localStorage.removeItem('user');
            localStorage.removeItem('userID');
            this.logged = false
          if(error.status == 401){
            this.router.navigateByUrl('/pageaccessdenied');
          } else if(error.status == 400){
            this.showMessage(error.error.error)
          } else if(error.status == 500){
            this.showMessage(error.error.error)
          }
        }
      );
        },
        error => {
          localStorage.setItem('loggedInStatus', 'false');
            localStorage.removeItem('user');
            localStorage.removeItem('userID');
            this.logged = false
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
      
    });
    // this.logged = true;
    
    //this.router.navigateByUrl('/');
    
  }
  showMessage(message: string) {
    this.snackBar.open(message, "OK");
    console.log("snackbar user id: " + sessionStorage.getItem('userID'));
  }

  logOut(): void {
    console.log("logging out")
    this.socialAuthService.signOut();
    this.httpClient.get<any>("http://localhost:8080/api/logout", {withCredentials: true}).subscribe(
      error => {
        if(error.status == 404){
          this.router.navigateByUrl('/404');
        }
      }
    );
    localStorage.removeItem('userID');
    localStorage.setItem('loggedInStatus', 'false');
    localStorage.removeItem('user');
    localStorage.removeItem('userID');
    this.logged = false
  }

}
