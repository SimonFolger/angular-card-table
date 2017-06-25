import { Component, OnInit, OnChanges, AfterViewChecked } from '@angular/core';
import { AppComponent } from './../app.component';

declare var $: any;

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements AfterViewChecked {

  players = this.appComponent.players;
  newGame = false;
  gameTypes = ["Solo", "Sauspiel", "Bettler", "Ramsch"];
  showStyle = false;

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

  test1 = "";
  test2 = "";

  constructor(private appComponent: AppComponent) {}

  ngAfterViewChecked() {
    if(this.selectedGameType != "" || this.selectedPlayer.length != 0 || this.playerWon != 0 || this.runnings != 0 ||
        this.tailor != 0 || this.contra != 0 || this.ramschWinner != "" || this.ramschLooser != "") {
      $(document).ready(function() {
        window.scrollTo(0,document.body.scrollHeight);
      });
    }
  }

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
    console.log(this.selectedPlayer.length);
    if(this.selectedGameType == "Sauspiel") {
      if (this.selectedPlayer.indexOf(player) == -1 && this.selectedPlayer.length < 2) {
        this.selectedPlayer.push(player);
        this.playerSelected++;
      } else {
        var index = this.selectedPlayer.indexOf(player);
        if(index > -1) {
          this.selectedPlayer.splice(index, 1);
          this.playerSelected--;
        }
      }
    } else if(this.selectedGameType != "Sauspiel") {
      if (this.selectedPlayer.indexOf(player) == -1 && this.selectedPlayer.length < 1) {
        this.selectedPlayer.push(player);
        this.playerSelected++;
      } else {
        var index = this.selectedPlayer.indexOf(player);
        if(index > -1) {
          this.selectedPlayer.splice(index, 1);
          this.playerSelected--;
        }
      }
    }
    console.log(this.selectedPlayer);
  }

  setPlayerWon(number: number) {
    this.playerWon = number;
  }

  setRunnings(number: number) {
    this.runnings = number;
  }

  setTailor(number: number) {
    this.tailor = number;
  }

  setContra(number: number) {
    this.contra = number;
  }

  setRamschWinner(player: string) {
    this.ramschWinner = player;
  }

  setRamschLooser(player: string) {
    this.ramschLooser = player;
  }

  calc() {
    this.appComponent.moneyOld4 = this.appComponent.moneyOld3;
    this.appComponent.moneyOld3 = [];
    this.appComponent.moneyOld3 = this.appComponent.moneyOld2;
    this.appComponent.moneyOld2 = [];
    this.appComponent.moneyOld2 = this.appComponent.moneyOld1;
    this.appComponent.moneyOld1 = [];
    this.appComponent.moneyOld1.push(this.appComponent.players[0].money.toString());
    this.appComponent.moneyOld1.push(this.appComponent.players[1].money.toString());
    this.appComponent.moneyOld1.push(this.appComponent.players[2].money.toString());
    this.appComponent.moneyOld1.push(this.appComponent.players[3].money.toString());
    console.log(this.appComponent.moneyOld1);
    console.log(this.appComponent.moneyOld2);
    console.log(this.appComponent.moneyOld3);
    console.log(this.appComponent.moneyOld4);
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
      this.appComponent.fillLocalStorage();
      this.resetAll();
    }
    if(this.selectedGameType == "Sauspiel") {
      amount = 20;
      if(this.runnings > 2) {
        amount += (this.runnings - 2) * 10;
      }
      if(this.tailor == 1) {
        amount += 10;
      }
      if(this.tailor == 3) {
        amount += 20;
      }
      if(this.contra == 1) {
        amount += 20;
      }
      for(let entry of this.players) {
        if(entry.name == this.selectedPlayer[0] || entry.name == this.selectedPlayer[1]) {
          if(this.playerWon == 1) {
            entry.money += amount / 2;
          } else {
            entry.money -= amount / 2;
          }
        } else {
          if(this.playerWon == 1) {
            entry.money -= amount / 2;
          } else {
            entry.money += amount / 2;
          }
        }
      }
      this.appComponent.fillLocalStorage();
      this.resetAll();
    }
    if(this.selectedGameType == "Bettler") {
      amount = 30;
      if(this.contra == 1) {
        amount += 15;
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
      this.appComponent.fillLocalStorage();
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
      this.appComponent.fillLocalStorage();
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
