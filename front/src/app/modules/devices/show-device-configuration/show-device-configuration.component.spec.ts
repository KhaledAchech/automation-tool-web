import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDeviceConfigurationComponent } from './show-device-configuration.component';

describe('ShowDeviceConfigurationComponent', () => {
  let component: ShowDeviceConfigurationComponent;
  let fixture: ComponentFixture<ShowDeviceConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDeviceConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDeviceConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
