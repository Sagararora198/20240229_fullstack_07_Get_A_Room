import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoomComponent } from './admin-room.component';

describe('AdminRoomComponent', () => {
  let component: AdminRoomComponent;
  let fixture: ComponentFixture<AdminRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRoomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
