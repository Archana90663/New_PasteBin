import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paste } from '../types/pastestype';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar";
import getExpireInText from '../util/getExireIn'
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { MonacoEditorConstructionOptions, MonacoStandaloneCodeEditor } from '@materia-ui/ngx-monaco-editor';

@Component({
  selector: 'app-textpage',
  templateUrl: './textpage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./textpage.component.css']
})
export class TextpageComponent implements OnInit {
  editorOptions: MonacoEditorConstructionOptions  = {theme: 'vs-dark', language: 'javascript', readOnly: true};
  editor: MonacoStandaloneCodeEditor | undefined;
  // code: string = 'function x() {\nconsole.log("Hello world!");\n}';
  editorInit(editor: MonacoStandaloneCodeEditor) {
    // Programatic content selection example
    this.editor = editor;
    this.getText()
    console.log("abcd");
  }
  paste!: Paste;
  public socialUser: SocialUser = new SocialUser;
  isLoggedin: boolean = false;
  getExpireIn = getExpireInText
  map = new Map();
  userMap = new Map();
  
  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private socialAuthService: SocialAuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    var loggedInStatus = JSON.parse(localStorage.getItem('loggedInStatus') || 'false');
    if(loggedInStatus === true){
      this.socialUser = JSON.parse(localStorage.getItem('user') || '{}');
    }
    if(localStorage.getItem('userMap') === null){
      this.userMap = new Map();
    }
    else{
      let jsonObject = JSON.parse(localStorage.getItem('userMap') || '{}');
      for (var value in jsonObject) {  
         this.userMap.set(value,jsonObject[value])  
      }
      console.log(this.userMap);
    }

    if(localStorage.getItem('map') === null){
      this.map = new Map();
    }
    else{
      let jsonObject = JSON.parse(localStorage.getItem('map') || '{}');
      for (var value in jsonObject) {  
         this.map.set(value,jsonObject[value])  
      }
    }
    console.log(typeof(this.map));
    console.log(this.map);
    this.getText()
  }
  getText(){
    console.log("storage ID: " + localStorage.getItem('userID'));
    this.activatedRoute.queryParams.subscribe(params => {
      let id = params['id'];
      this.httpClient.post<any>("http://localhost:8080/api/getText",{"id":id}, {withCredentials: true}).subscribe(
      response => {
        if(this.map.has(id)){
          this.paste = this.map.get(id);
          this.editor?.getModel()?.setValue(this.paste.body)
        }
        else{
          this.paste = response;
          this.editor?.getModel()?.setValue(this.paste.body)
        }
      },
      error => {
        if(error.status == 404){
          this.router.navigateByUrl('/404');
        }
        else if(error.status == 410){
          this.router.navigateByUrl('/expiredpage');
        } 
        else if(error.status == 401){
          this.router.navigateByUrl('/pageaccessdenied');
        } 
        else if(error.status == 400){
          this.showMessage(error.error.error)
        } 
        else if(error.status == 500){
          this.showMessage(error.error.error)
        }
      }
    );
    console.log(this.paste);
  });
    
    }


    deleteText(){
      this.activatedRoute.queryParams.subscribe(params => {
        let id = params['id'];
        console.log(id);
        this.httpClient.post<any>("http://localhost:8080/api/deleteText",{"id":id}).subscribe(
          response => {
          console.log(response)
          if(this.map.has(id)){
            this.map.delete(id);
            let jsonObject:any = {};  
            this.map.forEach((value, key) => {  
            jsonObject[key] = value  
    });
            localStorage.setItem('map', JSON.stringify(jsonObject));          }
          this.showMessage("TEXT DELETED")
          this.router.navigateByUrl('/');
        },
        error => {
          if(error.status == 404){
            this.router.navigateByUrl('/404');
          }
          else if(error.status == 410){
            this.router.navigateByUrl('/expiredpage');
          }
        }
      );
    });
      
      }

      showMessage(message: string) {
        this.snackBar.open(message, "OK");
        console.log("snackbar user id: " + sessionStorage.getItem('userID'));
      }
}

