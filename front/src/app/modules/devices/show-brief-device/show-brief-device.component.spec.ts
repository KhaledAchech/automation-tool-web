import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBriefDeviceComponent } from './show-brief-device.component';

describe('ShowBriefDeviceComponent', () => {
  let component: ShowBriefDeviceComponent;
  let fixture: ComponentFixture<ShowBriefDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowBriefDeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBriefDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
