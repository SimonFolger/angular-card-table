import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

constructor() {
}

ngOnInit() {

}

  player="";

  buttons:string[]=[];


  newButton() {
  if(this.buttons.length <= 4 ){
this.buttons.push(this.player);
      }
      this.player="";
    }

  deleteButton() {
  this.buttons.splice(-1,1);
  this.player="";
  }


  }
