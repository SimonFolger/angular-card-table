import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { TableComponent } from './../table/table.component';
import { AppComponent } from "../app.component";

declare var $: any;

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements AfterViewChecked, OnInit {

  table = this.tableComponent.table;

  gameCounter = 0;
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
  ramschTime = false;
  heartSoloTime = false;
  specialTime = false;


  constructor(private tableComponent: TableComponent, private appComponent: AppComponent) {}

  ngOnInit() { }

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
    this.tableComponent.moneyOld4 = this.tableComponent.moneyOld3;
    this.tableComponent.moneyOld3 = [];
    this.tableComponent.moneyOld3 = this.tableComponent.moneyOld2;
    this.tableComponent.moneyOld2 = [];
    this.tableComponent.moneyOld2 = this.tableComponent.moneyOld1;
    this.tableComponent.moneyOld1 = [];
    this.tableComponent.moneyOld1.push(this.table.data[0].money.toString());
    this.tableComponent.moneyOld1.push(this.table.data[1].money.toString());
    this.tableComponent.moneyOld1.push(this.table.data[2].money.toString());
    this.tableComponent.moneyOld1.push(this.table.data[3].money.toString());


    if(this.selectedGameType == "Solo") {
      this.solo();
    }

    if(this.selectedGameType == "Sauspiel") {
      this.sauspiel();
    }

    if(this.selectedGameType == "Bettler") {
      this.bettler();
    }

    if(this.selectedGameType == "Ramsch") {
      this.ramsch();
    }

  this.afterGameComplete();
  }

  afterGameComplete() {
    this.resetAll();
    +this.table.count++;
    this.gameMode();
    this.appComponent.updateTableData(this.tableComponent.key, this.table);
  }

  gameMode() {
    if(this.table.count % 11 == 0) {
      let random = Math.floor(Math.random() * 2) + 1;
      if(random == 1) {
        this.specialTime = true;
        this.heartSoloTime = true;
      } else if(random == 2) {
        this.specialTime = true;
        this.ramschTime = true;
      }
    } else {
      this.newGame = false;
    }
  }

  startRamsch() {
    this.newGame = true;
    this.specialTime = false;
    this.setGameType("Ramsch");
    this.ramschTime = false;
  }

  startHeartSolo() {
    this.newGame = true;
    this.specialTime = false;
    this.setGameType("Solo");
    this.heartSoloTime = false;
  }

  solo() {
    let amount: number;
    amount = 0.30;
    if(this.runnings > 2) {
      amount += (this.runnings - 2) * 0.15;
    }
    if(this.tailor == 1) {
      amount += 0.15;
    }
    if(this.tailor == 3) {
      amount += 0.30;
    }
    if(this.contra == 1) {
      amount += 0.30;
    }
    for(let entry of this.table.data) {
      if(entry.name == this.selectedPlayer[0]) {
        if(this.playerWon == 1) {
          entry.money = +entry.money + amount;
        } else {
          entry.money -= amount;
        }
      } else {
        if(this.playerWon == 1) {
          entry.money -= amount / 3;
        } else {
          entry.money = +entry.money + (amount / 3);
        }
      }
    }
  }

  bettler() {
    let amount: number;
    amount = 0.30;
    if(this.contra == 1) {
      amount += 0.15;
    }
    for(let entry of this.table.data) {
      if(entry.name == this.selectedPlayer[0]) {
        if(this.playerWon == 1) {
          entry.money = +entry.money + amount;
        } else {
          entry.money -= amount;
        }
      } else {
        if(this.playerWon == 1) {
          entry.money -= amount / 3;
        } else {
          entry.money = +entry.money + (amount / 3);
        }
      }
    }
  }

  ramsch() {
    let amount: number;
    amount = 0.20;
    for(let entry of this.table.data) {
      if(entry.name == this.ramschWinner) {
        entry.money = +entry.money + amount;
      }
      if(entry.name == this.ramschLooser) {
        entry.money -= amount;
      }
    }
  }

  sauspiel() {
    let amount: number;
    amount = 0.20;
    if(this.runnings > 2) {
      amount += (this.runnings - 2) * 0.10;
    }
    if(this.tailor == 1) {
      amount += 0.10;
    }
    if(this.tailor == 3) {
      amount += 0.20;
    }
    if(this.contra == 1) {
      amount += 0.20;
    }
    for(let entry of this.table.data) {
      if(entry.name == this.selectedPlayer[0] || entry.name == this.selectedPlayer[1]) {
        if(this.playerWon == 1) {
          entry.money = +entry.money + (amount / 2);
        } else {
          entry.money -= amount / 2;
        }
      } else {
        if(this.playerWon == 1) {
          entry.money -= amount / 2;
        } else {
          entry.money = +entry.money + (amount / 2);
        }
      }
    }
  }

  resetAll() {
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
    this.specialTime = false;
  }
}
