import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPhotoProfileComponent } from './info-photo-profile.component';

describe('InfoPhotoProfileComponent', () => {
  let component: InfoPhotoProfileComponent;
  let fixture: ComponentFixture<InfoPhotoProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoPhotoProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPhotoProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
