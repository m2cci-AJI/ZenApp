import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationBreathingComponent } from './duration-breathing.component';

describe('DurationBreathingComponent', () => {
  let component: DurationBreathingComponent;
  let fixture: ComponentFixture<DurationBreathingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DurationBreathingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationBreathingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
