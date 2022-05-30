import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDiscoveredDevicesComponent } from './show-discovered-devices.component';

describe('ShowDiscoveredDevicesComponent', () => {
  let component: ShowDiscoveredDevicesComponent;
  let fixture: ComponentFixture<ShowDiscoveredDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDiscoveredDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDiscoveredDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
