import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Paste } from '../types/pastestype';
import { MatSnackBar } from "@angular/material/snack-bar";
import {Router} from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';


interface SubmitTextPayload{
  "UserID": string,
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
    this.socialAuthService.authState.subscribe(user =>{
      this.socialUser = user;
      this.logged = true;
      localStorage.setItem('UserID', user.id);
      // console.log("id: "+ user.id)
    })
  }
  postText(){
  const getID= localStorage.getItem('UserID')
  console.log(getID)
  const payload:SubmitTextPayload = {"UserID":String(getID),"title":String(this.textModel.title).replace(/<[^>]+>/gm, ''),"body":String(this.textModel.body).replace(/<[^>]+>/gm, ''), "tag": this.tagGlobal}
  if(this.textModel.expire_at != ""){
    payload.expire_at =  (new Date(Date.parse(this.textModel.expire_at))).toISOString()
  }
    this.httpClient.post<any>("http://localhost:8080/api/submitText", payload).subscribe(
      response => {
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
}
