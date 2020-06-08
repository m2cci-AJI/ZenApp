import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowCommentComponent } from './window-comment.component';

describe('WindowCommentComponent', () => {
  let component: WindowCommentComponent;
  let fixture: ComponentFixture<WindowCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
