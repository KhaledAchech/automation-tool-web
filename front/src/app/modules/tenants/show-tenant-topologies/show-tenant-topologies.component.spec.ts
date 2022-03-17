import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTenantTopologiesComponent } from './show-tenant-topologies.component';

describe('ShowTenantTopologiesComponent', () => {
  let component: ShowTenantTopologiesComponent;
  let fixture: ComponentFixture<ShowTenantTopologiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTenantTopologiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTenantTopologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
