import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Paste } from '../types/pastestype';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SubmitpageComponent } from './submitpage.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';


describe('SubmitpageComponent', () => {
  let component: SubmitpageComponent;
  let fixture: ComponentFixture<SubmitpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        RouterTestingModule,
        MatSnackBarModule,
        SocialLoginModule,

      ],
      declarations: [ SubmitpageComponent ],
      providers: [{
        provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1034579701724-528o8e1fg6tp9shf1qj0ius2o09as4i4.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
      }]
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


  it('Should return TRUE as user created the paste', () =>{
    const paste = new Paste("","10624190371723279782","Hello World","","","This is body","unlisted");
    const res = component.submitPasteTest(paste);
    expect(res).toBeTruthy();
  });

  it('Should return FALSE as user did not create the paste', () =>{
    const paste = new Paste("","4321","Hello World","","","This is body","unlisted");
    const res = component.submitPasteTest(paste);
    expect(res).toBeFalsy();
  });

  it('Return TRUE as user is not logged in but makes an "Unlisted" paste', () =>{
    const paste = new Paste("","","Hello World","","","This is body","unlisted");
    const res = component.chooseTagTest(paste);
    expect(res).toBeTruthy();
  });

  it('Return TRUE as user is not logged in but makes a "Public" paste', () =>{
    const paste = new Paste("","","Hello World","","","This is body","public");
    const res = component.chooseTagTest(paste);
    expect(res).toBeTruthy();
  });

  it('Return FALSE as user is not logged in but makes a "Private" paste', () =>{
    const paste = new Paste("","","Hello World","","","This is body","private");
    const res = component.chooseTagTest(paste);
    expect(res).toBeFalsy();
  });

  it('Return TRUE as user is logged in and makes a "Private" paste', () =>{
    const paste = new Paste("","1234","Hello World","","","This is body","private");
    const res = component.chooseTagTest(paste);
    expect(res).toBeTruthy();
  });

  it('Return TRUE as user is logged in', () =>{
    const res = component.TestUserValid();
    expect(res).toBeTruthy();
  });

  it('Return TRUE as paste title is not null', () =>{
    const paste = new Paste("","1234","Hello World","","","This is body","public");
    const res = component.TestPasteTittle(paste);
    expect(res).toBeTruthy();
  });

  it('Return FALSE as paste title is null', () =>{
    const paste = new Paste("","1234","","","","This is body","public");
    const res = component.TestPasteTittle(paste);
    expect(res).toBeFalsy();
  });

  it('Return TRUE as paste body is not null', () =>{
    const paste = new Paste("","1234","Hello World","","","This is body","public");
    const res = component.TestPasteBody(paste);
    expect(res).toBeTruthy();
  });

  it('Return FALSE as paste body is null', () =>{
    const paste = new Paste("","1234","Hello World","","","","public");
    const res = component.TestPasteBody(paste);
    expect(res).toBeFalsy();
  });

  it('Return TRUE as paste expiration date is not null and is not set', () =>{
    const paste = new Paste("","1234","Hello World","","","This is body","public");
    const res = component.TestExpiryDate(paste);
    expect(res).toBeTruthy();
  });

  it('Return TRUE as paste expiration date is not null and is set', () =>{
    const paste = new Paste("","1234","Hello World","","12","This is body","public");
    const res = component.TestExpiryDate(paste);
    expect(res).toBeTruthy();
  });

  

});
