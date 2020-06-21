import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PranayamaService } from '../../../services/pranayama.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-musique-tuning',
  templateUrl: './musique-tuning.component.html',
  styleUrls: ['./musique-tuning.component.css']
})
export class MusiqueTuningComponent implements OnInit {
  musique: any = 'Silence';
  constructor(private router: Router, private pranayamaService: PranayamaService) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    this.pranayamaService.setMusique(f.value.musique);
    this.router.navigateByUrl('/pranayama/tuning/end-tuning');
  }

  invalidate() {
    this.router.navigateByUrl('/pranayama/tuning/duration-breathing');
  }
}
