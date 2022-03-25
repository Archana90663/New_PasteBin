import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser} from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Paste } from '../types/pastestype';


@Component({
  selector: 'app-viewpage',
  templateUrl: './viewpage.component.html',
  styleUrls: ['./viewpage.component.css']
})
export class ViewpageComponent implements OnInit {

  pastes: Paste[] = [];
  public socialUser: SocialUser = new SocialUser;


  constructor(
    private auth: SocialAuthService,
    private httpClient: HttpClient,
  ) { }

  ngOnInit(): void {
    this.getPastes();
    this.auth.authState.subscribe(user =>{
      this.socialUser = user;
    });
  }


  getPastes(){
    this.httpClient.get<any>("http://localhost:8080/api/allTexts", {withCredentials: true}).subscribe(
      response => {
        this.pastes = response.texts
        // console.log(this.pastes[0].UserID)
      }
    );
  }

}
