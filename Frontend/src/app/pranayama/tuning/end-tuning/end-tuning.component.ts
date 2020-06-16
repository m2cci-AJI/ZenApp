import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PranayamaService } from '../../../services/pranayama.service';

@Component({
  selector: 'app-end-tuning',
  templateUrl: './end-tuning.component.html',
  styleUrls: ['./end-tuning.component.css']
})
export class EndTuningComponent implements OnInit {

  constructor(private router: Router, private pranayamaService: PranayamaService) { }

  ngOnInit() {
  }

  validate() {
    console.log(this.pranayamaService.sessionPranyama);
    this.router.navigateByUrl('/pranayama/practice');
  }

  invalidate() {
    this.router.navigateByUrl('/pranayama/tuning/musique-tuning');
  }

}
