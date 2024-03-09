import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelDescriptionComponent } from './hotel-description.component';

describe('HotelDescriptionComponent', () => {
  let component: HotelDescriptionComponent;
  let fixture: ComponentFixture<HotelDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
