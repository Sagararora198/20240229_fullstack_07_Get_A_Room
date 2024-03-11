import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureComponentComponent } from './picture-component.component';

describe('PictureComponentComponent', () => {
  let component: PictureComponentComponent;
  let fixture: ComponentFixture<PictureComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PictureComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PictureComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
