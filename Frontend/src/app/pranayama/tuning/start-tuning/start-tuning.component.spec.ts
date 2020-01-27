import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartTuningComponent } from './start-tuning.component';

describe('StartTuningComponent', () => {
  let component: StartTuningComponent;
  let fixture: ComponentFixture<StartTuningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartTuningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartTuningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
