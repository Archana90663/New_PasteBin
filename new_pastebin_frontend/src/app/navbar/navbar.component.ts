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
      if(localStorage.getItem('userMap') === null){
        this.userMap = new Map();
      }
      else{
        let jsonObject = JSON.parse(localStorage.getItem('userMap') || '{}');
        for (var value in jsonObject) {  
           this.userMap.set(value,jsonObject[value])  
        }
      }
      if(!this.userMap.has(this.socialUser.id)){
        this.userMap.set(this.socialUser.id, this.socialUser);
      }
      let jsonObject:any = {};  
      this.userMap.forEach((value, key) => {  
      jsonObject[key] = value  
    });
      localStorage.setItem('userMap', JSON.stringify(jsonObject));
      console.log(this.userMap);      
      localStorage.setItem('user', JSON.stringify(this.socialUser));
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
    // this.logged = true;
    localStorage.setItem('loggedInStatus', 'true');
    console.log("ID: " + localStorage.getItem('userID'));
    this.router.navigateByUrl('/');
    
  }
  showMessage(message: string) {
    this.snackBar.open(message, "OK");
    console.log("snackbar user id: " + sessionStorage.getItem('userID'));
  }

  logOut(): void {
    this.socialAuthService.signOut();
    this.httpClient.get('http://localhost:8080/api/logout')
    localStorage.removeItem('userID');
    this.logged = false;
    localStorage.setItem('loggedInStatus', 'false');
    localStorage.removeItem('user');
    console.log("ID: " + localStorage.getItem('userID'));
    this.router.navigateByUrl('/');
    window.location.reload();
  }

}
