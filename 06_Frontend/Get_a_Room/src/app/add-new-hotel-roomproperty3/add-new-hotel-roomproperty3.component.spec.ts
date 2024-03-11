import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewHotelRoomproperty3Component } from './add-new-hotel-roomproperty3.component';

describe('AddNewHotelRoomproperty3Component', () => {
  let component: AddNewHotelRoomproperty3Component;
  let fixture: ComponentFixture<AddNewHotelRoomproperty3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewHotelRoomproperty3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewHotelRoomproperty3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
