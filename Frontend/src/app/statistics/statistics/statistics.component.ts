import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CalendrierService } from 'src/app/services/calendrier.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { WindowCommentComponent } from 'src/app/calendrier/window-comment/window-comment.component';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Yoga } from 'src/app/models/yoga.model';
import { StatisticsService } from '../../services/statistics.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { YogiService } from 'src/app/services/yogi.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  name: string;
  email: string;
  birthday: string;
  idUser: string;
  numberConnectionPerWeek: number;
  numberUsers: number;
  sessionsYoga: Yoga[];
  length: number;
  pageSize = 4;
  displayedColumns: string[] = ['start', 'typeYoga', 'sousTypeYoga', 'durationYoga', 'indeX'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatSort, { static: false }) matSort: MatSort;

  private paginator: MatPaginator;
  private sort: any;
  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }
  @ViewChild(MatSort, { static: true }) set content(content: ElementRef) {
    this.sort = content;
    this.dataSource.sort = this.sort;
  }
  public cellSpacing: number[] = [20, 20];
  public cellAspectRatio: number = 100 / 120;
  public allowResizing: boolean = true;
  public allowFloating: boolean = true;
  public mediaQuery: string = 'max-width: 700px';
  public resizableHandles: string[] = [
    'e-south-east', 'e-east', 'e-west', 'e-north', 'e-south'
  ];
  public palettes = ['#D35400', '#8E44AD'];
  public marker = { visible: true, width: 10, height: 10 };
  public zoom = {
    enableMouseWheelZooming: false,
    enablePinchZooming: false,
    enableSelectionZooming: false
  };
  public legend = { visible: true, toogleVisibility: false };
  public tooltip = { enable: true, shared: true, format: '${series.name}: ${point.x}: ${point.y}' };
  public crosshair = { enable: true, lineType: 'vertical' };
  public primaryXAxis: any = {
    valueType: 'Category'
  };
  public lineDataDayFreq: any[];
  public lineDataDayDur: any[];
  public lineDataWeekFreq: any[];
  public lineDataWeekDur: any[];
  public lineDataMonthDur: any[];
  public lineDataMonthFreq: any[];

  constructor(private calendrierService: CalendrierService,
              private matDialog: MatDialog,
              private statisticsService: StatisticsService,
              private yogiService: YogiService) {
    this.idUser = new JwtHelperService().decodeToken(localStorage.getItem('token')).id;
    this.calendrierService.getItems(this.idUser).subscribe((data) => {
      const input: Yoga[] = ((data.body) as any).Data;
      this.sessionsYoga = input;
      this.length = input.length;
      this.lineDataDayFreq = this.statisticsService.linedataDay(this.createDataDayX(), this.createDataDayFreqY());
      this.lineDataDayDur = this.statisticsService.linedataDay(this.createDataDayX(), this.createDataDayDurationY());
      this.lineDataWeekFreq = this.statisticsService.linedataWM(this.createDataWeekX(), this.createDataWeekFreqY());
      this.lineDataWeekDur = this.statisticsService.linedataWM(this.createDataWeekX(), this.createDataWeekDurationY());
      this.lineDataMonthDur = this.statisticsService.linedataWM(this.createDataMonthX(), this.createDataMonthFreqY());
      this.lineDataMonthFreq = this.statisticsService.linedataWM(this.createDataMonthX(), this.createDataMonthDurationY());
      for (let i = 0; i < input.length; i++) {
        input[i]['indeX'] = i;
      }
      this.dataSource = new MatTableDataSource(input);
    },
      (err) => {
        console.log('the error is: ', err);
      });
  }

  ngOnInit() {
    this.getNumberYogi();
    this.getNumberConnections();
    this.getProfilYogi();
  }

  getProfilYogi() {
    this.yogiService.getOneYogi(this.idUser).subscribe((yogi) => {
      const profil = ((yogi.body) as any).Data[0];
      this.name = profil.name;
      this.email = profil.email;
      this.birthday = profil.birthday;
    },
      (err) => {
        console.log(err);
      });
  }

  getNumberConnections() {
    this.yogiService.getAllYogi().subscribe((data) => {
      let somme = 0;
      for (let i = 0; i < ((data.body) as any).Data.length; i++) {
        somme = somme + ((data.body) as any).Data[i].ConnectionPerWeek;
      }
      this.numberConnectionPerWeek = somme;
    },
      (err) => {
        console.log(err);
      });
  }

  getNumberYogi() {
    this.yogiService.getAllYogi().subscribe((data) => {
      this.numberUsers = ((data.body) as any).Data.length;
    },
      (err) => {
        console.log(err);
      });
  }

  // the graph of daily variation of frequencies and durations of meditation
  createDataDayX() {
    return this.statisticsService.getTableOnedates(1);
  }

  createDataDayDurationY() {
    const durations = [];
    for (let i = 0; i < this.createDataDayX().length; i++) {
      let duration = 0;
      for (let j = 0; j < this.sessionsYoga.length; j++) {
        if ((new Date(this.sessionsYoga[j].start).getDay() === this.createDataDayX()[i].getDay())
          && (new Date(this.sessionsYoga[j].start).getMonth() === this.createDataDayX()[i].getMonth())
          && (new Date(this.sessionsYoga[j].start).getFullYear() === this.createDataDayX()[i].getFullYear())) {
          duration = duration + this.sessionsYoga[j].durationYoga;
        }
      }
      durations.push(duration);
    }
    return durations;
  }

  createDataDayFreqY() {
    const frequencies = [];
    for (let i = 0; i < this.createDataDayX().length; i++) {
      let frequency = 0;
      for (let j = 0; j < this.sessionsYoga.length; j++) {
        if ((new Date(this.sessionsYoga[j].start).getDay() === this.createDataDayX()[i].getDay())
          && (new Date(this.sessionsYoga[j].start).getMonth() === this.createDataDayX()[i].getMonth())
          && (new Date(this.sessionsYoga[j].start).getFullYear() === this.createDataDayX()[i].getFullYear())) {
          frequency = frequency + 1;
        }
      }
      frequencies.push(frequency);
    }
    return frequencies;
  }

  // the graph of weekly variation of frequencies and durations of meditation
  createDataWeekX() {
    return this.statisticsService.getTableTwoDates(this.statisticsService.getTableOnedates(7));
  }

  createDataWeekDurationY() {
    return this.statisticsService.createDataDurY(this.createDataWeekX(), this.sessionsYoga);
  }

  createDataWeekFreqY() {
    return this.statisticsService.createDataFreqY(this.createDataWeekX(), this.sessionsYoga);
  }

  // the graph of mensualy variation of frequencies and durations of meditation
  createDataMonthX() {
    return this.statisticsService.getTableTwoDates(this.statisticsService.getTableOnedates(30));
  }

  createDataMonthDurationY() {
    return this.statisticsService.createDataDurY(this.createDataMonthX(), this.sessionsYoga);
  }

  createDataMonthFreqY() {
    return this.statisticsService.createDataFreqY(this.createDataMonthX(), this.sessionsYoga);
  }

  openModal(dialogConfig: MatDialogConfig, index: number) {
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = { item: index + 1 };
  }

  getComment(index: number) {
    const dialogConfig = new MatDialogConfig();
    this.openModal(dialogConfig, index);
    const dialogRef = this.matDialog.open(WindowCommentComponent, dialogConfig);
  }
}
