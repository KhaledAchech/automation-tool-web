import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignConfigurationComponent } from './assign-configuration.component';

describe('AssignConfigurationComponent', () => {
  let component: AssignConfigurationComponent;
  let fixture: ComponentFixture<AssignConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
