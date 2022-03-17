import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTenantComponent } from './add-edit-tenant.component';

describe('AddEditTenantComponent', () => {
  let component: AddEditTenantComponent;
  let fixture: ComponentFixture<AddEditTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
