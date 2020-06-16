import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowTimeComponent } from './window-time.component';
import { MatDialogRef } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('WindowTimeComponent', () => {
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  let component: WindowTimeComponent;
  let fixture: ComponentFixture<WindowTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowTimeComponent ],
      imports: [ FormsModule,  NgbModule ],
      providers: [{ provide: MatDialogRef, useValue: mockDialogRef }]
    })
    .compileComponents();
    fixture = TestBed.createComponent(WindowTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate onWindow', () => {
    const form = {value: {dp3: new Date(2020, 10, 1), dp4: new Date(2020, 10, 3)}};
    component.onWindow(form);
    expect(component.dateStart).toEqual(new Date(2020, 10, 1));
    expect(component.dateEnd).toEqual(new Date(2020, 10, 3));
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should validate closeModal', () => {
    component.closeModal();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should validate CompareDates', () => {
    const res = component.CompareDates(new Date(2020, 10, 2), new Date(2020, 10, 1));
    expect(res).toEqual(true);
  });


});
