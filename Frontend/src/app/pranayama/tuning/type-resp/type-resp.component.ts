import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PranayamaService } from '../../pranayama.service';

@Component({
  selector: 'app-type-resp',
  templateUrl: './type-resp.component.html',
  styleUrls: ['./type-resp.component.css']
})
export class TypeRespComponent implements OnInit {
  TypeResp: any = 'Equilibré';
  constructor(private router: Router, private pranayamaService: PranayamaService) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    this.pranayamaService.setDefaultValues();
    this.pranayamaService.setTypeRespiration(f.value.respiration);
    this.router.navigateByUrl('/pranayama/tuning/duration-session');
  }


  invalidate() {
    this.router.navigateByUrl('/pranayama/tuning/start-tuning');
  }

}
