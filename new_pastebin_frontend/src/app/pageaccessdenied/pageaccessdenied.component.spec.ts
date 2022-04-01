import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageaccessdeniedComponent } from './pageaccessdenied.component';

describe('PageaccessdeniedComponent', () => {
  let component: PageaccessdeniedComponent;
  let fixture: ComponentFixture<PageaccessdeniedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageaccessdeniedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageaccessdeniedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
