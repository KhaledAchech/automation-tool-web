import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProtocolComponent } from './add-edit-protocol.component';

describe('AddEditProtocolComponent', () => {
  let component: AddEditProtocolComponent;
  let fixture: ComponentFixture<AddEditProtocolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditProtocolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditProtocolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
