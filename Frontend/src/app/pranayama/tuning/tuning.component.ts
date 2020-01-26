import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-tuning',
  templateUrl: './tuning.component.html',
  styleUrls: ['./tuning.component.css']
})
export class TuningComponent implements OnInit {
  valueSeance: number = 5;
  optionsSeance: Options = {floor: 5, ceil: 60};

  valueIns: number = 3;
  optionsIns: Options = {floor: 3, ceil: 15};

  valueExp: number = 3;
  optionsExp: Options = {floor: 3, ceil: 15};

  valuePlein: number = 3;
  optionsPlein: Options = {floor: 3, ceil: 15};

  valueVide: number = 3;
  optionsVide: Options = {floor: 3, ceil: 15};

  constructor() { }

  ngOnInit() {
  }

}
