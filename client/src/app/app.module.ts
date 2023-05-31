import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { MainComponent } from './pages/main/main.component';
import { SidenavContentComponent } from './components/sidenav-content/sidenav-content.component';
import { RoomComponent } from './components/room/room.component';
import { UserService } from './services/user.service';
import { RoomService } from './services/room.service';
import { ElementService } from './services/element.service';
import { NoteService } from './services/note.service';
import { PriceComponent } from './pages/price/price.component';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    SidenavContentComponent,
    HomeComponent,
    NavComponent,
    RoomComponent,
    PriceComponent,
    MainComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    RoomService,
    ElementService,
    NoteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
