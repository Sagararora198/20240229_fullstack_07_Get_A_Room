import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomResourceComponent } from './room-resource.component';

describe('RoomResourceComponent', () => {
  let component: RoomResourceComponent;
  let fixture: ComponentFixture<RoomResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomResourceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
