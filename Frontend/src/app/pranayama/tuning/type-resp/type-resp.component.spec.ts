import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeRespComponent } from './type-resp.component';

describe('TypeRespComponent', () => {
  let component: TypeRespComponent;
  let fixture: ComponentFixture<TypeRespComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeRespComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeRespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
