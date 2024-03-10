import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminbookingsComponent } from './adminbookings.component';

describe('AdminbookingsComponent', () => {
  let component: AdminbookingsComponent;
  let fixture: ComponentFixture<AdminbookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminbookingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminbookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
