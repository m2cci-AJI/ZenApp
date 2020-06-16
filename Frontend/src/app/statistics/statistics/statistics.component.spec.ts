import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, MatDialogModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';
import { ChartAllModule, AccumulationChartAllModule } from '@syncfusion/ej2-angular-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { StatisticsComponent } from './statistics.component';
import { StatisticsService } from 'src/app/services/statistics.service';
import { YogiService } from 'src/app/services/yogi.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtHelperService } from '@auth0/angular-jwt';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;
  let serviceSta: StatisticsService;
  let serviceYog: YogiService;
  let jwtHelper: JwtHelperService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticsComponent],
      providers: [StatisticsService, YogiService, JwtHelperService ],
      imports: [
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
        MatSortModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    serviceSta = TestBed.get(StatisticsService);
    serviceYog = TestBed.get(YogiService);
    jwtHelper = TestBed.get(JwtHelperService);
    fixture.detectChanges();
  }));
});
