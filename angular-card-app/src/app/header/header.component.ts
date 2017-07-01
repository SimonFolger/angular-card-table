import { Component, OnInit } from '@angular/core';
import { AppComponent } from './../app.component'
import { Table } from './../table';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  tables = this.appComponent.tablesDB;

  homeRoute = "Home";
  activeRoute = this.homeRoute;
  menuOpen = false;

  constructor(private appComponent: AppComponent) {}

  ngOnInit() {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  setActive(route: string) {
    this.activeRoute = route;
    this.menuOpen = false;
  }
}
