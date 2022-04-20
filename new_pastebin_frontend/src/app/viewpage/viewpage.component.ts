import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { Paste, PasteView } from '../types/pastestype';
import { MatSnackBar } from "@angular/material/snack-bar";  
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import getExpireInText from '../util/getExireIn'


@Component({
  selector: 'app-viewpage',
  templateUrl: './viewpage.component.html',
  styleUrls: ['./viewpage.component.css']
})
export class ViewpageComponent implements OnInit {

  public socialUser: SocialUser = new SocialUser;

  pastes: PasteView[] = [];
  getExpireIn = getExpireInText


  constructor(
    private socialAuthService: SocialAuthService,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router

  ) { }

  ngOnInit(): void {

    this.getPastes();
    
    var loggedInStatus = JSON.parse(localStorage.getItem('loggedInStatus') || 'false');
    if(loggedInStatus === true){
      this.socialUser = JSON.parse(localStorage.getItem('user') || '{}');
      console.log(this.socialUser);
    }
    
    // this.socialAuthService.authState.subscribe(user =>{
    //   this.socialUser = user;
    //   console.log("user: " + user.email);
    // });
  }

  getPastes(){
    this.httpClient.get<any>("http://localhost:8080/api/allUserTexts", {withCredentials: true}).subscribe(      
      response => {
        this.pastes = response.texts
      },
      error => {
        if(error.status == 401){
          this.router.navigateByUrl('/pageaccessdenied');
        } 
        else if(error.status == 500){
          this.showMessage(error.error.error)
        }
      }
    );
  }

  TestUserValid():Boolean{
    this.socialUser = JSON.parse(localStorage.getItem('user') || '{}');
    if(this.socialUser != undefined){
      return true;
    }
    return false;
  }

  TestPastesValid():Boolean{
    if(this.pastes.length === 0){
      return true;
    }
    return false;
  }

  TestMapValid(): Boolean{
    if(localStorage.getItem('map') === null){
      return true;
    }
    return false;
  }

  showMessage(message: string) {
    this.snackBar.open(message, "OK");
    console.log("snackbar user id: " + sessionStorage.getItem('userID'));
  }

}
