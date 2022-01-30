import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Text } from './viewpage/text';
import { ViewpageComponent } from './viewpage/viewpage.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'new_pastebin_frontend';

  text:Text[]=[]; 
  t = new Text();

  constructor(private viewpage: ViewpageComponent){}

  ngOnInit(){
    this.refresh();
  }

  refresh(){
    this.viewpage.getText().subscribe(
      data=>{
        console.log(data);
        this.text = data;
      }
    )
  }

  addText(){
    this.viewpage.addText(this.t).subscribe(
        data=>{
          console.log(data);
          this.refresh();
        }
    )
  }




}
