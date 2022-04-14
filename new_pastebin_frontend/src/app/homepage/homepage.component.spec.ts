import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import { HomepageComponent } from './homepage.component';
import { GoogleLoginProvider } from 'angularx-social-login';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageComponent ],
      imports: [
        HttpClientModule, 
        SocialLoginModule,
        Ng2SearchPipeModule],
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
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Since filter tag here is "newest" the expected string should be that', () => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    const filter = "newest";
    const bool = true;
    const res = component.onChange(filter, bool);
    expect(res).toBe("newest");
  });

  it('Since filter tag here is "oldest" the expected string should be that', () => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    const filter = "oldest";
    const bool = true;
    const res = component.onChange(filter, bool);
    expect(res).toBe("oldest");
  });
  
  it('Since filter tag here is "alphabetical" the expected string should be that', () => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    const filter = "alpha";
    const bool = true;
    const res = component.onChange(filter, bool);
    expect(res).toBe("alpha");
  });

  it('Should return true as user remains logged in after refreshing', () => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    const res = component.testRefreshLogin();
    expect(res).toBeTruthy;
  });

  it('Should return true as user is logged in', () => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    const res = component.TestUserValid();
    expect(res).toBeTruthy;
  });

  it('Should return true as pastes array is not empty', () => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    const res = component.TestPastesValid();
    expect(res).toBeTruthy;
  });

  it('Should return true as paste map is not empty', () => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    const res = component.TestPasteMapValid();
    expect(res).toBeTruthy;
  });

  it('Since filter tag here is null the expected string should be that', () => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    const filter = "";
    const bool = true;
    const res = component.onChange(filter, bool);
    expect(res).toBe("");
  });

  it('Since filter tag here is null, but is not checked so function shouldnt return anything meaningful', () => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    const filter = "";
    const bool = false;
    const res = component.onChange(filter, bool);
    expect(res).toBe("");
  });


});
