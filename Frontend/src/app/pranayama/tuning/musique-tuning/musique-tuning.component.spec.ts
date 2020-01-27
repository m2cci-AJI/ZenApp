import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusiqueTuningComponent } from './musique-tuning.component';

describe('MusiqueTuningComponent', () => {
  let component: MusiqueTuningComponent;
  let fixture: ComponentFixture<MusiqueTuningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusiqueTuningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusiqueTuningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
