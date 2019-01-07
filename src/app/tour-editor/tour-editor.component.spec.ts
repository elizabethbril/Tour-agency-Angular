import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourEditorComponent } from './tour-editor.component';

describe('TourEditorComponent', () => {
  let component: TourEditorComponent;
  let fixture: ComponentFixture<TourEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
