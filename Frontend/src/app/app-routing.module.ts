import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { paranayamaRoutes } from './pranayama/pranayama.routes';
import { homeRoute } from './home/home.route';

const routes: Routes = [
  homeRoute,
  {path: '', redirectTo: 'home' , pathMatch: 'full'},
  ...paranayamaRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
