import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PracticeComponent } from './practice.component';
import { CalendrierService } from 'src/app/services/calendrier.service';
import { PranayamaService } from 'src/app/services/pranayama.service';
import { MatDialogModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Respiration } from '../respiration.enum';
import { Musique } from '../musique.enum';

describe('PracticeComponent', () => {
  let component: PracticeComponent;
  let fixture: ComponentFixture<PracticeComponent>;
  let serviceCal: CalendrierService;
  let servicePra: PranayamaService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeComponent ],
      imports: [ HttpClientTestingModule, MatDialogModule ],
      providers: [ CalendrierService, PranayamaService]
    })
    .compileComponents();
    fixture = TestBed.createComponent(PracticeComponent);
    component = fixture.componentInstance;
    serviceCal = TestBed.get(CalendrierService);
    servicePra = TestBed.get(PranayamaService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initValues', () => {
    component.initValues();
    expect(component.totalSecondes).toEqual(5 * 60);
    expect(component.durationResp).toEqual(5);
    expect(component.respiration).toEqual(Respiration['0']);
    expect(component.musique).toEqual(Musique['0']);
  });

  it('should validate animation', () => {
 
  });

  it('should validate ngOnInit', () => {
    spyOn(component, 'start');
    spyOn(component, 'startAudio');
    spyOn(component, 'detectImpact');
    component.ngOnInit();
    expect(component.start).toHaveBeenCalled();
    expect(component.startAudio).toHaveBeenCalled();
    expect(component.detectImpact).toHaveBeenCalled();
  });

  it('should validate startAudio in the first case', () => {
    component.musique = Musique['2'];
    spyOn(component, 'createAudio');
    component.startAudio();
    expect(component.createAudio).toHaveBeenCalled();
  });

  it('should validate startAudio in the second case', () => {
    component.musique = Musique['1'];
    spyOn(component, 'startAudioIntervall');
    component.startAudio();
    expect(component.startAudioIntervall).toHaveBeenCalled();
  });

  it('should validate calculateTimeBeforeImpact ', () => {
    spyOn(component, 'calculateTimeNextImpact');
    component.calculateTimeBeforeImpact(1);
    expect(component.calculateTimeNextImpact).toHaveBeenCalled();
  });

});
