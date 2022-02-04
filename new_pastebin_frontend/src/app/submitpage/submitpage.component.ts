import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Paste } from '../types/pastestype';
import { MatSnackBar } from "@angular/material/snack-bar";
import {Router} from '@angular/router';

interface SubmitTextPayload{
  "title": string,
  "body": string,
  "expire_at"? : string
}
@Component({
  selector: 'app-submitpage',
  templateUrl: './submitpage.component.html',
  styleUrls: ['./submitpage.component.css']
})
export class SubmitpageComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }
  textModel = new Paste("","","","","")
  ngOnInit(): void {
  }
  postText(){
  const payload:SubmitTextPayload = {"title":String(this.textModel.title).replace(/<[^>]+>/gm, ''),"body":String(this.textModel.body).replace(/<[^>]+>/gm, '')}
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
}
