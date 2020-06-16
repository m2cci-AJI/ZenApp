import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Comment } from '../../models/comment.model';
import { WindowCommentComponent } from './window-comment.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('WindowCommentComponent', () => {
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  let component: WindowCommentComponent;
  let fixture: ComponentFixture<WindowCommentComponent>;
  const data: any = {comment: new Comment('ahmed', 'mohamed', 'hatem'), value: true};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowCommentComponent ],
      providers: [{ provide: MatDialogRef, useValue: mockDialogRef }, { provide: MAT_DIALOG_DATA, useValue: data }],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(WindowCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

});
