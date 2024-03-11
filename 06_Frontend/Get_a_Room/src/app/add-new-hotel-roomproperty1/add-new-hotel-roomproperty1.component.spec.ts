import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewHotelRoomproperty1Component } from './add-new-hotel-roomproperty1.component';

describe('AddNewHotelRoomproperty1Component', () => {
  let component: AddNewHotelRoomproperty1Component;
  let fixture: ComponentFixture<AddNewHotelRoomproperty1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewHotelRoomproperty1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewHotelRoomproperty1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
