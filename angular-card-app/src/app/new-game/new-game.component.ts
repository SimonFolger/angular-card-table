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
  playerCount = 0;
  players = this.appComponent.players;
  selectedPlayer: string[] = [];
  selectedPlayerMax = 0;
  playerSelected = 0;
  playerWon = 0;
  runnings = 0;
  tailor = 0;
  contra = 0;

  constructor(private appComponent: AppComponent) {
  }

  ngOnInit() {
    
  }

  newEntry() {
    this.newGame = true;
  }

  selectGameType(gametype: string) {
    this.selectedGameType = gametype;
    if(gametype == this.gameTypes[1]) {
      this.playerCount = 2;
    } else {
      this.playerCount = 1;
    }
  }

  setPlayer(player: string) {
    if(this.selectedPlayer.indexOf(player) == -1) {
      this.selectedPlayer.push(player);
      this.playerSelected++;
    } else {
      var index = this.selectedPlayer.indexOf(player);
      this.selectedPlayer.splice(index, 1);
      this.playerSelected--;
    }
  }

  calc() {
    let amount: number;
    console.log(this.selectedGameType);
    if(this.selectedGameType == "Solo") {
      console.log("solo");
      amount = 30;
      if(this.runnings > 2) {
        amount += (this.runnings - 2) * 15;
      }
      if(this.tailor == 1) {
        amount += 15;
      }
      if(this.tailor == 3) {
        amount += 30;
      }
      if(this.contra == 1) {
        amount += 30;
      }
      if(this.playerWon = 1) {
        for(let entry of this.players) {
          if(entry.name == this.selectedPlayer[0]) {
            entry.money += amount;
          } else {
            entry.money -= amount / 3;
          }
        }
      }
    }
  }
}
