import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredpageComponent } from './expiredpage.component';

describe('ExpiredpageComponent', () => {
  let component: ExpiredpageComponent;
  let fixture: ComponentFixture<ExpiredpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpiredpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
