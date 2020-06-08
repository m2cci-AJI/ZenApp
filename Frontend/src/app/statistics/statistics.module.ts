import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics/statistics.component';
import { statisticsRoutes } from './statistics.routes';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [StatisticsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(statisticsRoutes),
  ]
})
export class StatisticsModule { }
