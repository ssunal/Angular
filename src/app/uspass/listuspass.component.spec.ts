import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListuspassComponent } from './listuspass.component';

describe('ListuspassComponent', () => {
  let component: ListuspassComponent;
  let fixture: ComponentFixture<ListuspassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListuspassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListuspassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
