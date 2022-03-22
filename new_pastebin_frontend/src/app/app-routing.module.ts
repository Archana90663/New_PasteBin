import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SubmitpageComponent } from './submitpage/submitpage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { TextpageComponent } from './textpage/textpage.component';
import { ExpiredpageComponent } from './expiredpage/expiredpage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';


const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'submitpage', component: SubmitpageComponent},
  {path: 'textpage', component: TextpageComponent},
  {path: 'expiredpage', component: ExpiredpageComponent},
  {path: 'loginpage', component: LoginpageComponent},
  {path: 'profilepage', component: ProfilepageComponent},
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[
  HomepageComponent,
  SubmitpageComponent,
  TextpageComponent
];