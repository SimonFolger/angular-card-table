import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  players: {name: string, money: number}[] = [
    {"name": "", "money": 0},
    {"name": "", "money": 0},
    {"name": "", "money": 0},
    {"name": "", "money": 0}
  ];
  moneyOld1: string[] = [];
  moneyOld2: string[] = [];
  moneyOld3: string[] = [];
  moneyOld4: string[] = [];
  
  editMode = false;
  dataChange = false;
  generatedString = "";
  stringCpy = false;
  stringEnter = false;
  enteredString = "";

  ngOnInit() {
    if(localStorage.getItem("player1") !== null) {
      this.players[0].name = localStorage.getItem("player1");
      this.players[0].money = Number(localStorage.getItem("money1"));
      this.players[1].name = localStorage.getItem("player2");
      this.players[1].money = Number(localStorage.getItem("money2"));
      this.players[2].name = localStorage.getItem("player3");
      this.players[2].money = Number(localStorage.getItem("money3"));
      this.players[3].name = localStorage.getItem("player4");
      this.players[3].money = Number(localStorage.getItem("money4"));
      this.dataChange = false;
    }
  }

  localStorageFilled() {
    if(localStorage.getItem("player1") !== null) {
      return true;
    } else {
      return false;
    }
  }

  done() {
    for(let entry of this.players) {
      if(entry.name.length > 0 && entry.money != null) {
        this.dataChange = false;
        this.fillLocalStorage();
        this.editMode = false;
      }
    }
  }

  fillLocalStorage() {
    localStorage.setItem("player1", this.players[0].name);
    localStorage.setItem("money1", this.players[0].money.toString());
    localStorage.setItem("player2", this.players[1].name);
    localStorage.setItem("money2", this.players[1].money.toString());
    localStorage.setItem("player3", this.players[2].name);
    localStorage.setItem("money3", this.players[2].money.toString());
    localStorage.setItem("player4", this.players[3].name);
    localStorage.setItem("money4", this.players[3].money.toString());
  }

  setEditMode() {
    this.editMode = !this.editMode;
    this.stringCpy = false;
    this.stringEnter = false;
    this.dataChange = false;
  }

  changeData() {
    this.dataChange = !this.dataChange;
    this.stringCpy = false;
    this.stringEnter = false;
  }

  generateString() {
    this.stringCpy = !this.stringCpy;
    this.dataChange = false;
    this.stringEnter = false;
    this.generatedString = this.players[0].name + "/" + this.players[0].money.toString() + "/" +
        this.players[1].name + "/" + this.players[1].money.toString() + "/" + this.players[2].name + "/" +
        this.players[2].money.toString() + "/" + this.players[3].name + "/" + this.players[3].money.toString();
  }

  transformString() {
    let splitted = this.enteredString.split("/");
    if(splitted.length == 8) {
      this.players[0].name = splitted[0];
      this.players[0].money = +splitted[1];
      this.players[1].name = splitted[2];
      this.players[1].money = +splitted[3];
      this.players[2].name = splitted[4];
      this.players[2].money = +splitted[5];
      this.players[3].name = splitted[6];
      this.players[3].money = +splitted[7];
      this.enteredString = "";
      this.editMode = false;
      this.stringEnter = false;
      this.fillLocalStorage();
    }
  }

  enterString() {
    this.stringEnter = !this.stringEnter;
    this.dataChange = false;
    this.stringCpy = false;
  }
}
