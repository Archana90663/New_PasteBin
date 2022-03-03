import { Component, OnInit, ViewChild } from '@angular/core';
// import { LoginpageComponent } from '../loginpage/loginpage.component';
import { SocialAuthService} from 'angularx-social-login';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // @ViewChild(LoginpageComponent) login:any;

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

  // ngAfterViewInit(){
  //   this.logged = this.login.isLoggedin;
  //   console.log("navbar Log: " + this.logged);
  // }

}
