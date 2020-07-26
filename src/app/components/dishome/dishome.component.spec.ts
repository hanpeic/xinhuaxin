import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishomeComponent } from './dishome.component';

describe('DishomeComponent', () => {
  let component: DishomeComponent;
  let fixture: ComponentFixture<DishomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
