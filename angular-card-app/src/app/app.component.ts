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
  

  tableReady = false;

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
      this.tableReady = true;
    }
  }

  done() {
    for(let entry of this.players) {
      if(entry.name.length > 0 && entry.money != null) {
        this.tableReady = true;
        this.fillLocalStorage();
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

  restart() {
    this.tableReady = false;
  }
}
