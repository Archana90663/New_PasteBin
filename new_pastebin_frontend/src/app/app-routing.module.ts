import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SubmitpageComponent } from './submitpage/submitpage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { TestpageComponent } from './testpage/testpage.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'submitpage', component: SubmitpageComponent},
  {path: 'testpage', component: TestpageComponent},
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
