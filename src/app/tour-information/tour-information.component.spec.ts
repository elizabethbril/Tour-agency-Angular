import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourInformationComponent } from './tour-information.component';

describe('TourInformationComponent', () => {
  let component: TourInformationComponent;
  let fixture: ComponentFixture<TourInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
