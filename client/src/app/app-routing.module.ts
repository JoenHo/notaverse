import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PriceComponent } from './pages/price/price.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: 'price', component: PriceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
