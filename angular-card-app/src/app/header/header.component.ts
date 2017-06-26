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

  newbutton() {
  console.log("kacke"+this.player);
this.buttons.push(this.player);
    }


  }
