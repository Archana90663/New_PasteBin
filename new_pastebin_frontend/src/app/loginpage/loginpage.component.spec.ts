// import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoginpageComponent } from './loginpage.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';



describe('LoginpageComponent', () => {
  let component: LoginpageComponent;
  let fixture: ComponentFixture<LoginpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginpageComponent ],
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

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [ LoginpageComponent ]
  //   })
  //   .compileComponents();
  // });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should return true as user has logged in', () => {
    fixture = TestBed.createComponent(LoginpageComponent);
    component = fixture.componentInstance;
    const value = component.TestBooleanLogin();
    expect(value).toBe(true);
  });

  it('Should return true as user has logged out', () => {
    fixture = TestBed.createComponent(LoginpageComponent);
    component = fixture.componentInstance;
    const value = component.TestBooleanLogout();
    expect(value).toBe(false);
  });

  it('Should return true as user has logged in and information is correctly extracted', () => {
    fixture = TestBed.createComponent(LoginpageComponent);
    component = fixture.componentInstance;
    const user = component.Testlogin();
    var res = true;
    var user_info: boolean[]=[];
    
    if(user.email !== null){
      user_info.push(true);
    }
    else{
      user_info.push(false);
    }
    if(user.name !== null){
      user_info.push(true);
    }
    else{
      user_info.push(false);
    }
    if(user.id !== null){
      user_info.push(true);
    }
    else{
      user_info.push(false);
    }

    for(var element of user_info){
      if(element === false){
        res = false;
        break;
      }
    }

    expect(res).toBe(true);
  });

  it('Should return true as user is valid', () => {
    fixture = TestBed.createComponent(LoginpageComponent);
    component = fixture.componentInstance;
    const value = component.TestUserValid();
    expect(value).toBe(true);
  });

  it('Should return true as user id is valid', () => {
    fixture = TestBed.createComponent(LoginpageComponent);
    component = fixture.componentInstance;
    const value = component.TestUserID();
    expect(value).toBe(true);
  });




});
