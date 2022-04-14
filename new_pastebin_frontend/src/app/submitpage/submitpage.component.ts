import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Paste } from '../types/pastestype';
import { MatSnackBar } from "@angular/material/snack-bar";
import {Router} from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';


interface SubmitTextPayload{
  "userID": string,
  "title": string,
  "body": string,
  "expire_at"? : string
  "tag" : string
}
@Component({
  selector: 'app-submitpage',
  templateUrl: './submitpage.component.html',
  styleUrls: ['./submitpage.component.css']
})
export class SubmitpageComponent implements OnInit {
  public socialUser: SocialUser = new SocialUser;
  map = new Map();

  constructor(
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private socialAuthService: SocialAuthService,
    private router: Router
  ) { }
  textModel = new Paste("","","","","","","")
  tagGlobal: string="";
  logged:boolean = false;
  title = new FormControl('', [Validators.required]);
  ngOnInit(): void {
    var loggedInStatus = JSON.parse(localStorage.getItem('loggedInStatus') || 'false');
    if(loggedInStatus === true){
      this.socialUser = JSON.parse(localStorage.getItem('user') || '{}');
      this.logged = true;
      console.log(this.socialUser);
    }
    else{
      this.logged = false;
    }
    console.log("id: "+ localStorage.getItem('userID'));
      if(localStorage.getItem('map') === null){
        this.map = new Map();
      }
      else{
        let jsonObject = JSON.parse(localStorage.getItem('map') || '{}');
        for (var value in jsonObject) {  
           this.map.set(value,jsonObject[value])  
        }
      }
  }
  
  postText(){
  const getID= localStorage.getItem('userID')
  console.log(getID)
  const payload:SubmitTextPayload = {"userID":String(getID),"title":String(this.textModel.title).replace(/<[^>]+>/gm, ''),"body":String(this.textModel.body).replace(/<[^>]+>/gm, ''), "tag": this.tagGlobal}
  if(this.textModel.expire_at != ""){
    payload.expire_at =  (new Date(Date.parse(this.textModel.expire_at))).toISOString()
  }
    this.httpClient.post<any>("http://localhost:8080/api/submitText", payload, {withCredentials: true}).subscribe(
      response => {
        var paste;
        if(this.textModel.expire_at != ""){
          paste = new Paste(response.id, payload.userID, payload.title, new Date().toISOString(), (new Date(Date.parse(this.textModel.expire_at))).toISOString(), payload.body, payload.tag);
        }
        else{
          paste = new Paste(response.id, payload.userID, payload.title, new Date().toISOString(), '', payload.body, payload.tag);
        }
        this.map.set(response.id, paste);
        let jsonObject:any = {};  
        this.map.forEach((value, key) => {  
        jsonObject[key] = value  
});
        localStorage.setItem('map', JSON.stringify(jsonObject));
        this.showMessage("TEXT POSTED")
        this.router.navigateByUrl('/textpage?id='+response.id);
      },
      error => {
        if(error.status == 400){
          this.showMessage(error.error.error)
          
        }
      }
    );
    console.log(payload)
  }
  showMessage(message: string) {
    this.snackBar.open(message, "OK");
    console.log("snackbar user id: " + sessionStorage.getItem('userID'));
  }

  onChange(tag: string, isChecked: boolean){
    if(isChecked){
      this.tagGlobal = tag;
      console.log("TAG: " + this.tagGlobal);
    }
  }

  isPastePublic(paste: Paste){ //for testing purposes
    if(paste.tag === 'public'){
      return true;
    }
    else{
      return false;
    }
  }

  submitPasteTest(paste: Paste):boolean{
    this.socialUser.id = "10624190371723279782";
    var value= false;
    if(paste.userID === this.socialUser.id){
      value = true;
    }
    else{
      value = false;
    }
    return value;
  }

  chooseTagTest(paste: Paste):boolean{
    var value = false;
    if(paste.userID === "" && (paste.tag === "public" || paste.tag === "unlisted")){
      value = true;
    }
    else if(paste.userID != "" && (paste.tag === "public" || paste.tag === "unlisted" || paste.tag === "private")){
      value = true;
    }
    else{
      value = false;
    }
    return value;
  }

  TestUserValid():Boolean{
    if(this.socialUser != undefined){
      return true;
    }
    return false;
  }

  TestPasteTittle(paste: Paste): Boolean{
    if(paste.title != ""){
      return true;
    }
    return false;
  }

  TestPasteBody(paste: Paste): Boolean{
    if(paste.body != ""){
      return true;
    }
    return false;
  }

  TestExpiryDate(paste: Paste):Boolean{
    if(paste.expire_at != undefined){
      return true;
    }
    return false;
  }

}
