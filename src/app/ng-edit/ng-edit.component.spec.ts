import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgEditComponent } from './ng-edit.component';

describe('NgEditComponent', () => {
  let component: NgEditComponent;
  let fixture: ComponentFixture<NgEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
