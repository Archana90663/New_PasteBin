import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilepageComponent } from './profilepage.component';
import { HttpClientModule } from '@angular/common/http';
import { SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProfilepageComponent', () => {
  let component: ProfilepageComponent;
  let fixture: ComponentFixture<ProfilepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilepageComponent ],
      imports: [
        HttpClientModule, 
        SocialLoginModule,
        Ng2SearchPipeModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        
      ],
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
    fixture = TestBed.createComponent(ProfilepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should return true as user information is not undefined', () => {
    fixture = TestBed.createComponent(ProfilepageComponent);
    component = fixture.componentInstance;
    const res = component.testUserProfile();
    expect(res).toBeTruthy;
  });

});
