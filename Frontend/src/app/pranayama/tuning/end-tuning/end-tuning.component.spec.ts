import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndTuningComponent } from './end-tuning.component';

describe('EndTuningComponent', () => {
  let component: EndTuningComponent;
  let fixture: ComponentFixture<EndTuningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndTuningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndTuningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
