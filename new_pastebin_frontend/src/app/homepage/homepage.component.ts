import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paste, PasteView } from '../types/pastestype';
import getExpireInText from '../util/getExireIn'
import { SocialAuthService, SocialUser } from 'angularx-social-login';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  pastes: PasteView[] =[];
  searchTerm : string='';
  term: string = '';

  user_name: string = '';
  logged:boolean = false;


  public socialUser: SocialUser = new SocialUser;

  getExpireIn = getExpireInText
  constructor(
    private socialAuthService: SocialAuthService,
    private httpClient: HttpClient,
    private auth: SocialAuthService
    ) { }

  ngOnInit(): void {
    var loggedInStatus = JSON.parse(localStorage.getItem('loggedInStatus') || 'false');
    if(loggedInStatus === true){
      this.socialUser = JSON.parse(localStorage.getItem('user') || '{}');
      this.logged = true;
      console.log(this.socialUser);
      this.user_name = this.socialUser.firstName;
      
    }
    else{
      this.logged = false;
      this.user_name = '';
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

    

    this.getPastes();
    // this.auth.authState.subscribe(user =>{
    //   if(user){
    //     this.logged = true;
    //     this.user_name = user.firstName;
    //   }
    //   else{
    //     this.logged = false;
    //     this.user_name = '';
    //   }
    // });
    
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

  testRefreshLogin(): Boolean{
    this.socialUser = JSON.parse(localStorage.getItem('user') || '{}');
    if(this.socialUser != undefined){
      return true;
    }
    else{
      return false;
    }
  }

  TestUserValid():Boolean{
    if(this.socialUser != undefined){
      return true;
    }
    return false;
  }

  TestPastesValid(): Boolean{
    if(this.pastes.length != 0){
      return true;
    }
    return false;
  }

  TestPasteMapValid(): Boolean{
    // if(this.map.size != 0){
    //   return true;
    // }
    // return false;
    return true;
  }

  

}
