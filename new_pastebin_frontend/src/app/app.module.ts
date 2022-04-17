import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SubmitpageComponent } from './submitpage/submitpage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { FormsModule }   from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { MatCardModule } from "@angular/material/card"
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TextpageComponent } from './textpage/textpage.component';
import { ExpiredpageComponent } from './expiredpage/expiredpage.component';
import { ReactiveFormsModule} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { ViewpageComponent } from './viewpage/viewpage.component';
import { AboutpageComponent } from './aboutpage/aboutpage.component';
import { PageaccessdeniedComponent } from './pageaccessdenied/pageaccessdenied.component';
import { SignuppageComponent } from './signuppage/signuppage.component';
import { MonacoEditorModule, MONACO_PATH } from '@materia-ui/ngx-monaco-editor';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavbarComponent,
    SubmitpageComponent,
    PagenotfoundComponent,
    TextpageComponent,
    ExpiredpageComponent,
    LoginpageComponent,
    ProfilepageComponent,
    ViewpageComponent,
    AboutpageComponent,
    PageaccessdeniedComponent,
    SignuppageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule, 
    RichTextEditorAllModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    NgxMaterialTimepickerModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatCardModule,
    MatSnackBarModule,
    MatSelectModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    SocialLoginModule,
    BrowserModule,
    FormsModule,
    MonacoEditorModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1034579701724-528o8e1fg6tp9shf1qj0ius2o09as4i4.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
    {
      provide: MONACO_PATH,
      useValue: 'https://unpkg.com/monaco-editor@0.31.1/min/vs',
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
