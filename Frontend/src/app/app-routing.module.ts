import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { paranayamaRoutes } from './pranayama/pranayama.routes';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  ...paranayamaRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
