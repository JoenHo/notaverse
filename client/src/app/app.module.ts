import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './pages/login/login.component';
import { SidenavContentComponent } from './components/sidenav-content/sidenav-content.component';
import { RoomComponent } from './components/room/room.component';
import { UserService } from './services/user.service';
import { RoomService } from './services/room.service';
import { ElementService } from './services/element.service';
import { NoteService } from './services/note.service';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    SidenavContentComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    RoomComponent
  ],
  imports: [
    BrowserModule,
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
