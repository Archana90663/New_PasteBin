import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SubmitpageComponent } from './submitpage/submitpage.component';

const routes: Routes = [
  {path: 'homepage', component: HomepageComponent},
  {path: 'submitpage', component: SubmitpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[
  HomepageComponent,
  SubmitpageComponent
];