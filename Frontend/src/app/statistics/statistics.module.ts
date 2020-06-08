import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics/statistics.component';
import { statisticsRoutes } from './statistics.routes';
import { RouterModule } from '@angular/router';
import { WindowCommentComponent } from '../calendrier/window-comment/window-comment.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';
import { ChartAllModule, AccumulationChartAllModule } from '@syncfusion/ej2-angular-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(statisticsRoutes),
    DashboardLayoutModule,
    ChartAllModule,
    AccumulationChartAllModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#8f56ad',
      animationDuration: 300
    }),
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: 'rgb(211, 84, 0)',
      animationDuration: 300
    }),
    MatSortModule
  ],
  exports: [MatTableModule, MatPaginatorModule],
  entryComponents: [WindowCommentComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StatisticsModule { }
