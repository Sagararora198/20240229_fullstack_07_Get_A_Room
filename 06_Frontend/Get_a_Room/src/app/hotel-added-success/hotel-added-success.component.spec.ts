import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelAddedSuccessComponent } from './hotel-added-success.component';

describe('HotelAddedSuccessComponent', () => {
  let component: HotelAddedSuccessComponent;
  let fixture: ComponentFixture<HotelAddedSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelAddedSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelAddedSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
