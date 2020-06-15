import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommentComponent } from './comment.component';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comment } from '../models/comment.model';
import { DebugElement } from '@angular/core';

describe('CommentComponent', () => {
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  const data: any = {comment: new Comment('ahmed', 'mohamed', 'hatem'), value: true};
  let submitEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentComponent ],
      imports: [FormsModule ],
      providers: [{ provide: MatDialogRef, useValue: mockDialogRef }, { provide: MAT_DIALOG_DATA, useValue: data }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    submitEl = fixture.debugElement.query(By.css('button[type=submit]'));
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.sensations).toEqual('ahmed');
    expect(component.emotions).toEqual('mohamed');
    expect(component.pensees).toEqual('hatem');
    expect(component.value).toBeTruthy();
  });

  it('should validate changeTitleWindow', () => {
    expect(component.changeTitleWindow).toBeTruthy();
  });

  it('should verify if the onComment method wil be applied when user clicks on button type submit', () => {
    component.ngOnInit();
    submitEl.nativeElement.disabled = false;
    spyOn(component, 'onComment');
    submitEl.nativeElement.click();
    expect(component.onComment).toHaveBeenCalledTimes(1);
  });

  it('should validate onComment', () => {
    const sensationsEl = component.ngForm.controls["sensations"];
    const emotionsEl = component.ngForm.controls["emotions"];
    const penseesEl = component.ngForm.controls["pensees"];
    sensationsEl.setValue('relaxé');
    emotionsEl.setValue('heureux');
    penseesEl.setValue('positive');
    expect(component.sensations).toEqual('relaxé');
    expect(component.emotions).toEqual('heureux');
    expect(component.pensees).toEqual('positive');
  });

  it('should verify if the form controls are invalid if the condition are not satisfied', () => {
    const sensationsEl = component.ngForm.controls["sensations"];
    const emotionsEl = component.ngForm.controls["emotions"];
    const penseesEl = component.ngForm.controls["pensees"];
    sensationsEl.setValue('');
    emotionsEl.setValue('');
    penseesEl.setValue('');
    expect(component.ngForm.invalid).toBeTruthy();
  });

  it('should close window when user clicks on submit button', () => {
    const f: any  = {value: {sensations: 'h', emotions: 't', pensees: 'k'}};
    component.onComment(f);
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should close window when user clicks on click button', () => {
    component.closeModal();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
