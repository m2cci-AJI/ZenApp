import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PracticeComponent } from './practice.component';
import { MeditationService } from 'src/app/services/meditation.service';
import { CalendrierService } from 'src/app/services/calendrier.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialog } from '@angular/material';
import { Comment } from 'src/app/models/comment.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommentComponent } from 'src/app/comment/comment.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SessionMeditation } from 'src/app/models/meditation.model';
import { Meditation } from 'src/app/meditation.enum';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

describe('PracticeComponent', () => {
  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };
  let component: PracticeComponent;
  let fixture: ComponentFixture<PracticeComponent>;
  let serviceCal: CalendrierService;
  let serviceMed: MeditationService;
  let jwtHelper: JwtHelperService;
  let store = {};
  const mockLocalStorage = {
    getItem: (key: string): string => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeComponent, CommentComponent],
      imports: [  FormsModule, HttpClientTestingModule, MatDialogModule, BrowserAnimationsModule ],
      providers: [ { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, CalendrierService, MeditationService,  JwtHelperService ]
    })
    .compileComponents();
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [CommentComponent]
      }
    })
    .compileComponents();
    fixture = TestBed.createComponent(PracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serviceCal = TestBed.get(CalendrierService);
    serviceMed = TestBed.get(MeditationService);
    jwtHelper = TestBed.get(JwtHelperService);
    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
  }));

  it('should create', () => {
    spyOn(serviceMed, 'getMeditations').and.callThrough();
    component.ngOnInit();
    expect(serviceMed.getMeditations).toHaveBeenCalledTimes(1);
  });

  it('should validate audioEnded method', () => {
    spyOn(component, 'editComment').and.callThrough();
    const comment = new Comment('', '', '');
    const index = 1;
    component.audioEnded(index);
    expect(component.comment).toEqual(comment);
    expect(component.index).toEqual(1);
    expect(component.editComment).toHaveBeenCalled();
  });

  it('should validate endAudio method', () => {
    const index = 1;
    component.index = 1;
    const res =  component.endAudio(index);
    expect(res).toEqual(true);
  });

  it('should validate editComment method', () => {
    spyOn(component, 'openModal').and.callThrough();
    component.editComment();
    expect(dialogSpy).toHaveBeenCalled();
    expect(component.openModal).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });

});
