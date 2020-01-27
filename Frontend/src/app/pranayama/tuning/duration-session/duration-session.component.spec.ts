import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationSessionComponent } from './duration-session.component';

describe('DurationSessionComponent', () => {
  let component: DurationSessionComponent;
  let fixture: ComponentFixture<DurationSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DurationSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
