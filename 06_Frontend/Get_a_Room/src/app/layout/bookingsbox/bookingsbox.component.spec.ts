import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsboxComponent } from './bookingsbox.component';

describe('BookingsboxComponent', () => {
  let component: BookingsboxComponent;
  let fixture: ComponentFixture<BookingsboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingsboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingsboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
