import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { Router } from '@angular/router';
import { PranayamaService } from '../../pranayama.service';

@Component({
  selector: 'app-duration-breathing',
  templateUrl: './duration-breathing.component.html',
  styleUrls: ['./duration-breathing.component.css']
})
export class DurationBreathingComponent implements OnInit {
  valueRes: number = 3;
  optionsRes: Options = {floor: 3, ceil: 15};
  constructor(private router: Router, private pranayamaService: PranayamaService) { }

  ngOnInit() {
  }

  validate() {
    this.pranayamaService.setDurationRespiration(this.valueRes);
    this.router.navigateByUrl('/pranayama/tuning/musique-tuning');
  }

  invalidate() {
    this.router.navigateByUrl('/pranayama/tuning/duration-session');
  }

}
