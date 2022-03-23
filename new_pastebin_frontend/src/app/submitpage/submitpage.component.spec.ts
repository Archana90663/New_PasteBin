import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Paste } from '../types/pastestype';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SubmitpageComponent } from './submitpage.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

describe('SubmitpageComponent', () => {
  let component: SubmitpageComponent;
  let fixture: ComponentFixture<SubmitpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        RouterTestingModule,
        MatSnackBarModule,
      ],
      declarations: [ SubmitpageComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Paste tag is "public" so it should return as true', () =>{
    const paste = new Paste("","","","","","","public");
    const res = component.isPastePublic(paste);
    expect(res).toBeTruthy();
  });

  it('Paste tag is "private" so it should return as false', () =>{
    const paste = new Paste("","","","","","","private");
    const res = component.isPastePublic(paste);
    expect(res).toBeFalsy();
  });
  it('Paste tag is "unlisted" so it should return as false', () =>{
    const paste = new Paste("","","","","","","unlisted");
    const res = component.isPastePublic(paste);
    expect(res).toBeFalsy();
  });

});
