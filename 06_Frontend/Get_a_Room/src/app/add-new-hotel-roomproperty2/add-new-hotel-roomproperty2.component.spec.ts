import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewHotelRoomproperty2Component } from './add-new-hotel-roomproperty2.component';

describe('AddNewHotelRoomproperty2Component', () => {
  let component: AddNewHotelRoomproperty2Component;
  let fixture: ComponentFixture<AddNewHotelRoomproperty2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewHotelRoomproperty2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewHotelRoomproperty2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
