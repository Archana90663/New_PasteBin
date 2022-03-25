import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { Paste } from '../types/pastestype';
import { HttpClient } from '@angular/common/http';
import getExpireInText from '../util/getExireIn'


@Component({
  selector: 'app-viewpage',
  templateUrl: './viewpage.component.html',
  styleUrls: ['./viewpage.component.css']
})
export class ViewpageComponent implements OnInit {

  public socialUser: SocialUser = new SocialUser;
  pastes: Paste[] = [];
  getExpireIn = getExpireInText


  constructor(
    private socialAuthService: SocialAuthService,
    private httpClient: HttpClient,

  ) { }

  ngOnInit(): void {
    this.getPastes();
    console.log("init");
    this.socialAuthService.authState.subscribe(user =>{
      this.socialUser = user;
      console.log("user: " + user.email);
    });
  }

  getPastes(){
    this.httpClient.get<any>("http://localhost:8080/api/allTexts").subscribe(
      response => {
        this.pastes = response.texts
      }
    );
  }

}