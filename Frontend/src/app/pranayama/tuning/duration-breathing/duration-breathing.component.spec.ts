import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { DurationBreathingComponent } from './duration-breathing.component';
import { Ng5SliderModule } from 'ng5-slider';
import { RouterTestingModule } from '@angular/router/testing';
import { PranayamaService } from '../../pranayama.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MusiqueTuningComponent } from '../musique-tuning/musique-tuning.component';
import { FormsModule } from '@angular/forms';
import { paranayamaRoutes } from '../../pranayama.routes';
import { PracticeComponent } from '../../practice/practice.component';
import { DurationSessionComponent } from '../duration-session/duration-session.component';
import { EndTuningComponent } from '../end-tuning/end-tuning.component';
import { StartTuningComponent } from '../start-tuning/start-tuning.component';
import { TypeRespComponent } from '../type-resp/type-resp.component';
import { UserManualComponent } from '../../user-manual/user-manual.component';

describe('DurationBreathingComponent', () => {
  let component: DurationBreathingComponent;
  let fixture: ComponentFixture<DurationBreathingComponent>;
  let service: PranayamaService;
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
      imports: [FormsModule, Ng5SliderModule, RouterTestingModule, RouterTestingModule.withRoutes([...paranayamaRoutes])],
      providers: [PranayamaService]
    })
      .compileComponents();
    fixture = TestBed.createComponent(DurationBreathingComponent);
    component = fixture.componentInstance;
    service = TestBed.get(PranayamaService);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate validate method', fakeAsync(() => {
    spyOn(service, 'setDurationRespiration');
    component.validate();
    tick();
    expect(location.path()).toBe('/pranayama/tuning/musique-tuning');
    expect(service.setDurationRespiration).toHaveBeenCalled();
  }));

  it('should validate invalidate method', fakeAsync(() => {
    component.invalidate();
    tick();
    expect(location.path()).toBe('/pranayama/tuning/duration-session');
  }));

});
