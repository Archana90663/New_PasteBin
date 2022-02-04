import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paste } from '../types/pastestype';
import { ActivatedRoute, Router } from '@angular/router';
import getExpireInText from '../util/getExireIn'

@Component({
  selector: 'app-textpage',
  templateUrl: './textpage.component.html',
  styleUrls: ['./textpage.component.css']
})
export class TextpageComponent implements OnInit {
  paste!: Paste;
  getExpireIn = getExpireInText
  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getText()
  }
  getText(){
    this.activatedRoute.queryParams.subscribe(params => {
      let id = params['id'];
      this.httpClient.post<any>("http://localhost:8080/api/getText",{"id":id}).subscribe(
      response => {
        this.paste = response
        console.log(this.paste)
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
}

