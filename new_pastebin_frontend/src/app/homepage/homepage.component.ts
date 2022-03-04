import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paste } from '../types/pastestype';
import getExpireInText from '../util/getExireIn'
import { SocialAuthService} from 'angularx-social-login';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  pastes: Paste[] =[];
  searchTerm : string='';
  term: string = '';

  user_name: string = '';
  logged:boolean = false;

  getExpireIn = getExpireInText
  constructor(
    private httpClient: HttpClient,
    private auth: SocialAuthService
    ) { }

  ngOnInit(): void {
    this.getPastes();
    this.auth.authState.subscribe(user =>{
      if(user){
        this.logged = true;
        this.user_name = user.firstName;
      }
      else{
        this.logged = false;
        this.user_name = '';
      }
    });
  }

  getPastes(){
    this.httpClient.get<any>("http://localhost:8080/api/allTexts").subscribe(
      response => {
        this.pastes = response.texts
        console.log(this.pastes)
      }
    );
  }

  onChange(choice: string, isChecked: boolean){
    if(isChecked){
      console.log("choice: " + choice);
      if(choice === 'newest'){
        this.httpClient.get<any>("http://localhost:8080/api/allTexts").subscribe(
          response => {
            this.pastes = response.texts
            this.pastes = this.onNewest();
            console.log(this.pastes);
          }
        );
      }
      if(choice === 'oldest'){
        this.getPastes();
      }
      if(choice === 'alpha'){
        this.httpClient.get<any>("http://localhost:8080/api/allTexts").subscribe(
          response => {
            this.pastes = response.texts
            this.pastes = this.pastes.sort(function(a:Paste, b:Paste){
              return a.title.localeCompare(b.title);
            });
            console.log(this.pastes);
          }
        );
      }

    }
    return choice;

  }

  onNewest(){
    return this.pastes.sort((a: Paste, b: Paste) =>{
      return <any>new Date(b.created_at) - <any>new Date(a.created_at);
    });
  }

  

}
