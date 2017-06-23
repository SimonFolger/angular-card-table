import { Component, OnInit } from '@angular/core';
import { AppComponent } from './../app.component';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {

  newGame = false;
  gameTypes = ["Solo", "Sauspiel", "Bettler", "Ramsch"];
  selectedGameType: string;
  players = this.appComponent.players;

  constructor(private appComponent: AppComponent) {
  }

  ngOnInit() {
    
  }

  newEntry() {
    this.newGame = true;
  }

  setPlayer(player: Object) {
    for(let entry of this.players) {
      if(entry.name == player) {
        entry.money += 30;
      }
      if(entry.name != player) {
        entry.money -= 10;
      }
    }
    this.newGame = false;
    this.selectedGameType = "";
  }
}
