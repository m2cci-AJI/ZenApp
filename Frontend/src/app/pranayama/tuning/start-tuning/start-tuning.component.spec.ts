import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DurationSessionComponent } from '../duration-session/duration-session.component';
import { Ng5SliderModule } from 'ng5-slider';
import { RouterTestingModule } from '@angular/router/testing';
import { DurationBreathingComponent } from '../duration-breathing/duration-breathing.component';
import { MusiqueTuningComponent } from '../musique-tuning/musique-tuning.component';
import { EndTuningComponent } from '../end-tuning/end-tuning.component';
import { StartTuningComponent } from '../start-tuning/start-tuning.component';
import { TypeRespComponent } from '../type-resp/type-resp.component';
import { UserManualComponent } from '../../user-manual/user-manual.component';
import { PracticeComponent } from '../../practice/practice.component';
import { paranayamaRoutes } from '../../pranayama.routes';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('StartTuningComponent', () => {
  let component: StartTuningComponent;
  let fixture: ComponentFixture<StartTuningComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DurationBreathingComponent,
        MusiqueTuningComponent,
        PracticeComponent,
        DurationSessionComponent,
        EndTuningComponent,
        StartTuningComponent,
        TypeRespComponent,
        UserManualComponent],
      imports: [FormsModule, Ng5SliderModule, RouterTestingModule, RouterTestingModule.withRoutes([...paranayamaRoutes])]
    })
      .compileComponents();
    fixture = TestBed.createComponent(StartTuningComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate validate method', fakeAsync(() => {
    component.validate();
    tick();
    expect(location.path()).toBe('/pranayama/tuning/type-resp');
  }));

});
