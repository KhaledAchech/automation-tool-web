import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDeviceDetailsComponent } from './show-device-details.component';

describe('ShowDeviceDetailsComponent', () => {
  let component: ShowDeviceDetailsComponent;
  let fixture: ComponentFixture<ShowDeviceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDeviceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDeviceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
