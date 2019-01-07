import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTourComponent } from './create-tour.component';

describe('CreateTourComponent', () => {
  let component: CreateTourComponent;
  let fixture: ComponentFixture<CreateTourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
