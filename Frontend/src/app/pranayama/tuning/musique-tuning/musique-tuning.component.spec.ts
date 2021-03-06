import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DurationSessionComponent } from '../duration-session/duration-session.component';
import { Ng5SliderModule } from 'ng5-slider';
import { RouterTestingModule } from '@angular/router/testing';
import { PranayamaService } from 'src/app/services/pranayama.service';
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

describe('MusiqueTuningComponent', () => {
  let component: MusiqueTuningComponent;
  let fixture: ComponentFixture<MusiqueTuningComponent>;
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
    fixture = TestBed.createComponent(MusiqueTuningComponent);
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

  it('should validate onSubmit method', fakeAsync(() => {
    spyOn(service, 'setMusique');
    const f: any = {value: {musique: 'Silence'}};
    component.onSubmit(f);
    tick();
    expect(location.path()).toBe('/pranayama/tuning/end-tuning');
    expect(service.setMusique).toHaveBeenCalled();
  }));

  it('should validate invalidate method', fakeAsync(() => {
    component.invalidate();
    tick();
    expect(location.path()).toBe('/pranayama/tuning/duration-breathing');
  }));
});
