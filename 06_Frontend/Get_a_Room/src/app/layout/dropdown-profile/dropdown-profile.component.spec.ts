import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownProfileComponent } from './dropdown-profile.component';

describe('DropdownProfileComponent', () => {
  let component: DropdownProfileComponent;
  let fixture: ComponentFixture<DropdownProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropdownProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
