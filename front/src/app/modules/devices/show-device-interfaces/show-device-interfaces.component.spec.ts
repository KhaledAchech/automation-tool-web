import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDeviceInterfacesComponent } from './show-device-interfaces.component';

describe('ShowDeviceInterfacesComponent', () => {
  let component: ShowDeviceInterfacesComponent;
  let fixture: ComponentFixture<ShowDeviceInterfacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDeviceInterfacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDeviceInterfacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
