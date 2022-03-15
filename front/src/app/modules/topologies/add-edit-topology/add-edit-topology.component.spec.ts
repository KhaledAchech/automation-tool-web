import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTopologyComponent } from './add-edit-topology.component';

describe('AddEditTopologyComponent', () => {
  let component: AddEditTopologyComponent;
  let fixture: ComponentFixture<AddEditTopologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTopologyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTopologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
