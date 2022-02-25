import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SubmitpageComponent } from './submitpage/submitpage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { TestpageComponent } from './testpage/testpage.component';
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


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavbarComponent,
    SubmitpageComponent,
    PagenotfoundComponent,
    TestpageComponent,
    TextpageComponent,
    ExpiredpageComponent,
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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
