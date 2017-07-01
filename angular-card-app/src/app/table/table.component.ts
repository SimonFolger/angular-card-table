import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AppComponent } from './../app.component'
import { Table } from './../table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  tables = this.appComponent.tablesDB;

  table: any;

  dataChange = false;

  moneyOld1: string[] = [];
  moneyOld2: string[] = [];
  moneyOld3: string[] = [];
  moneyOld4: string[] = [];

  key: string;

  name: string;
  private sub: any;

  constructor(private route: ActivatedRoute, private appComponent: AppComponent) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.name = params['name'];
      this.tables.forEach(table => {
        this.table = table.find(myObj => myObj.name == this.name);
        this.key = this.table.$key;
      });
    });
  }

  changeData() {
    this.dataChange = !this.dataChange;
  }

  saveData() {
    this.appComponent.updateTableData(this.key, this.table);
    this.dataChange = false;
  }
}
