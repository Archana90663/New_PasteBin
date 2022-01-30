import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from './testpage/Person';
import { TestpageComponent } from './testpage/testpage.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'new_pastebin_frontend';
  // title = 'new_pastebin_frontend';
  Person: Person[] = [];
  loading: boolean = false;

  constructor(private testpage: TestpageComponent){

  }

  public getRequest(){
    this.loading = true;
    this.testpage.getRequest().subscribe(
      (response)=>{
        console.log('response received');
        this.Person = response;
      },
      (error)=>{
        console.error('Request failed with error')
        this.loading = false;
      },
      ()=>{
        console.error('request completed')
        this.loading = false;
      }
    )
    
  }
}
