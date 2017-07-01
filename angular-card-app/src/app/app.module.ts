import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { NewGameComponent } from './new-game/new-game.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HeaderComponent } from './header/header.component';
import { TableComponent } from './table/table.component';
import { HomeComponent } from './home/home.component';

export const firebaseConfig = {
  apiKey: "AIzaSyCUazJQjzNKxYye-NL7XUX5mzSlb-UUCZs",
  authDomain: "schafkopfen-6d5ac.firebaseapp.com",
  databaseURL: "https://schafkopfen-6d5ac.firebaseio.com",
  projectId: "schafkopfen-6d5ac",
  storageBucket: "schafkopfen-6d5ac.appspot.com",
  messagingSenderId: "29456234221"

}

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'table/:name', component: TableComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NewGameComponent,
    HeaderComponent,
    TableComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
