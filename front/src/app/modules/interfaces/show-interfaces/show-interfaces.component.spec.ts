import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInterfacesComponent } from './show-interfaces.component';

describe('ShowInterfacesComponent', () => {
  let component: ShowInterfacesComponent;
  let fixture: ComponentFixture<ShowInterfacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowInterfacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowInterfacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
