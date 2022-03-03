import { Component, OnInit, ViewChild } from '@angular/core';
import { SocialAuthService} from 'angularx-social-login';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  logged:boolean = false;

  constructor(private auth: SocialAuthService) {
   }

  ngOnInit(): void {
    this.auth.authState.subscribe(user=>{
      if(user){
        this.logged = true;
      }
      else{
        this.logged = false;
      }
    });

  }

}
