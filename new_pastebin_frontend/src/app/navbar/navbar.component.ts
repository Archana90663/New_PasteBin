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
    const id = sessionStorage.getItem('userID');
    if(id != null){
      this.logged = true;
    }
    else{
      this.logged = false;
    }

  }

}
