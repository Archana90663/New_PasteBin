import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewpageComponent } from './viewpage.component';
import { Paste } from '../types/pastestype';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';


describe('ViewpageComponent', () => {
  let component: ViewpageComponent;
  let fixture: ComponentFixture<ViewpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        RouterTestingModule,
        MatSnackBarModule,
        SocialLoginModule,

      ],
      declarations: [ ViewpageComponent ],
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
    fixture = TestBed.createComponent(ViewpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should return TRUE as user is logged in', () =>{
    const res = component.TestUserValid();
    expect(res).toBeTruthy();
  });

  it('Should return TRUE as pastes cannot be accessed by anonymous user', () =>{
    const res = component.TestPastesValid();
    expect(res).toBeTruthy();
  });

  it('Should return TRUE as map cannot be accessed by anonymous user', () =>{
    const res = component.TestMapValid();
    expect(res).toBeTruthy();
  });


});
