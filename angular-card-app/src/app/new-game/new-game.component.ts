import { Component, OnInit } from '@angular/core';
import { AppComponent } from './../app.component';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {

  players = this.appComponent.players;
  newGame = false;
  gameTypes = ["Solo", "Sauspiel", "Bettler", "Ramsch"];

  selectedGameType= "";
  playerCount = 0;
  selectedPlayer: string[] = [];
  playerSelected = 0;
  playerWon = 0;
  runnings = 0;
  tailor = 0;
  contra = 0;
  ramschWinner = "";
  ramschLooser = "";

  constructor(private appComponent: AppComponent) {}

  ngOnInit() {}

  newEntry() {
    this.newGame = true;
  }

  setGameType(gametype: string) {
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

  setRamschWinner(player: string) {
    this.ramschWinner = player;
  }

  setRamschLooser(player: string) {
    this.ramschLooser = player;
  }

  calc() {
    let amount: number;
    if(this.selectedGameType == "Solo") {
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
      for(let entry of this.players) {
        if(entry.name == this.selectedPlayer[0]) {
          if(this.playerWon == 1) {
            entry.money += amount;
          } else {
            entry.money -= amount;
          }
        } else {
          if(this.playerWon == 1) {
            entry.money -= amount / 3;
          } else {
            entry.money += amount / 3;
          }
        }
      }
      this.resetAll();
    }
    if(this.selectedGameType == "Ramsch") {
      amount = 20;
      for(let entry of this.players) {
        if(entry.name == this.ramschWinner) {
          entry.money += amount;
        }
        if(entry.name == this.ramschLooser) {
          entry.money -= amount;
        }
      }
      this.resetAll();
    }
  }

  resetAll() {
    this.newGame = false;
    this.selectedGameType = "";
    this.playerCount = 0;
    this.selectedPlayer = [];
    this.playerSelected = 0;
    this.playerWon = 0;
    this.runnings = 0;
    this.tailor = 0;
    this.contra = 0;
    this.ramschWinner = "";
    this.ramschLooser = "";
  }
}
