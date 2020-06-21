import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { Router } from '@angular/router';
import { PranayamaService } from 'src/app/services/pranayama.service';

@Component({
  selector: 'app-duration-session',
  templateUrl: './duration-session.component.html',
  styleUrls: ['./duration-session.component.css']
})

export class DurationSessionComponent implements OnInit {
  valueSeance: number = 5;
  optionsSeance: Options = {floor: 5, ceil: 60};
  constructor(private router: Router, private pranayamaService: PranayamaService) { }

  ngOnInit() {
  }

  validate() {
    this.pranayamaService.setDurationSession(this.valueSeance);
    this.router.navigateByUrl('/pranayama/tuning/duration-breathing');
  }

  invalidate() {
    this.router.navigateByUrl('/pranayama/tuning/type-resp');
  }
}
