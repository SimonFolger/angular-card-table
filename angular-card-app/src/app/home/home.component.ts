import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {AppComponent} from "../app.component";
import {Table} from "../table";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewChecked {
  ngAfterViewChecked() {

  }

  tableName = "";
  tables = this.appComponent.tablesDB;

  constructor(private appComponent: AppComponent) { }

  ngOnInit() {

  }

  addTable(newName: string) {
    this.appComponent.addTable(newName);
  }
  updateTableName(key: string, newText: string) {
    this.appComponent.updateTableName(key, newText);
  }
  deleteTable(key: string) {
    this.appComponent.deleteTable(key);
  }

}
