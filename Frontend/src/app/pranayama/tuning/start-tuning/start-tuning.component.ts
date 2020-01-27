import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-tuning',
  templateUrl: './start-tuning.component.html',
  styleUrls: ['./start-tuning.component.css']
})
export class StartTuningComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  validate() {
    this.router.navigateByUrl('/pranayama/tuning/type-resp');
  }

}
