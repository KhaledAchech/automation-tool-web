import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTenantsComponent } from './show-tenants.component';

describe('ShowTenantsComponent', () => {
  let component: ShowTenantsComponent;
  let fixture: ComponentFixture<ShowTenantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTenantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTenantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
