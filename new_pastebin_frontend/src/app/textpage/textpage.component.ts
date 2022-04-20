import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paste, PasteView } from '../types/pastestype';
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
  paste!: PasteView;
  public socialUser: SocialUser = new SocialUser;
  isLoggedin: boolean = false;
  getExpireIn = getExpireInText
  
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
    this.getText()
  }
  getText(){
    console.log("storage ID: " + localStorage.getItem('userID'));
    this.activatedRoute.queryParams.subscribe(params => {
      let id = params['id'];
      this.httpClient.post<any>("http://localhost:8080/api/getText",{"id":id}, {withCredentials: true}).subscribe(
      response => {
        this.paste = response;
        this.editor?.getModel()?.setValue(this.paste.body)
        monaco.editor.setModelLanguage(this?.editor?.getModel()!, this.paste.language);
        console.log(response)
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
          this.showMessage("TEXT DELETED")
          this.router.navigateByUrl('/');
        },
        error => {
          if(error.status == 400){
            this.showMessage(error.error.error)
          }
          else if(error.status == 500){
            this.showMessage(error.error.error)
          }
        }
      );
    });
      
      }

      showMessage(message: string) {
        this.snackBar.open(message, "OK");
        // console.log("snackbar user id: " + sessionStorage.getItem('userID'));
      }
}

