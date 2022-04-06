import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paste } from '../types/pastestype';
import getExpireInText from '../util/getExireIn'
import { SocialAuthService, SocialUser } from 'angularx-social-login';


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
  map = new Map();
  mapHas: string[]=[];

  public socialUser: SocialUser = new SocialUser;

  getExpireIn = getExpireInText
  constructor(
    private socialAuthService: SocialAuthService,
    private httpClient: HttpClient,
    private auth: SocialAuthService
    ) { }

  ngOnInit(): void {
    var loggedInStatus = JSON.parse(localStorage.getItem('loggedInStatus') || 'false');
    console.log(loggedInStatus);
    if(loggedInStatus === true){
      this.socialUser = JSON.parse(localStorage.getItem('user') || '{}');
      this.logged = true;
      console.log(this.socialUser);
      this.user_name = this.socialUser.firstName;
    }
    else{
      this.logged = false;
      this.user_name = '';
      console.log("Looged out");

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

    if(localStorage.getItem('map') === null){
      this.map = new Map();
    }
    else{
      let jsonObject = JSON.parse(localStorage.getItem('map') || '{}');
      for (var value in jsonObject) {  
         this.map.set(value,jsonObject[value])  
      }
    }
    
    console.log("homepage username: " + this.user_name);
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
        this.pastes.forEach(paste=>{
          this.mapHas.push(paste.id);
        })
        console.log(this.mapHas);
        for(let entry of this.map.entries()){
          var key = entry[0];
          if(!this.mapHas.includes(key)){
            this.map.delete(key);
          }
        }
        let jsonObject:any = {};  
            this.map.forEach((value, key) => {  
            jsonObject[key] = value  
          });
            localStorage.setItem('map', JSON.stringify(jsonObject));
            console.log(this.map);
        this.mapHas = [];
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
