import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Paste } from '../types/pastestype';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { TextpageComponent } from './textpage.component';

describe('TextpageComponent', () => {
  let component: TextpageComponent;
  let fixture: ComponentFixture<TextpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        RouterTestingModule,
        MatSnackBarModule,
        SocialLoginModule,

      ],
      declarations: [ TextpageComponent ],
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
    fixture = TestBed.createComponent(TextpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("If paste user id is not equal to user id then don't show delete button", ()=>{
    expect(fixture.debugElement.query(By.css('#deleteButton'))).toBeFalsy();
    // expect(component.socialUser.id).toBeFalsy();
  });

  it("If paste user id is equal to user id then show delete button", ()=>{
    expect(fixture.debugElement.query(By.css('#deleteButton'))).toBeTruthy();
    // expect(component.isDelete).toBeTruthy();
  });


});


