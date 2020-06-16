import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-end-tuning',
  templateUrl: './end-tuning.component.html',
  styleUrls: ['./end-tuning.component.css']
})
export class EndTuningComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  validate() {
    this.router.navigateByUrl('/pranayama/practice');
  }

  invalidate() {
    this.router.navigateByUrl('/pranayama/tuning/musique-tuning');
  }

}
