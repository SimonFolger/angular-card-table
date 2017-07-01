import {Component, OnInit} from '@angular/core';
import { Table } from './table';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  tablesDB: FirebaseListObservable<any>;

  constructor(db: AngularFireDatabase) {
    this.tablesDB = db.list('/tables');
  }

  doLogin() {

  }

  addTable(newName: string) {
    this.tablesDB.push({ name: newName, count: "0", data:
      [
        {name: "player1", money: "0"},
        {name: "player2", money: "0"},
        {name: "player3", money: "0"},
        {name: "player4", money: "0"}
      ] });
  }

  updateTableName(key: string, name: string) {
    this.tablesDB.update(key, { name: name });
  }

  updateTableData(key: string, allData: Table) {
    this.tablesDB.update(key, { data: allData.data, count: allData.count });
  }

  deleteTable(key: string) {
    this.tablesDB.remove(key);
  }

  ngOnInit() {
  }
}
