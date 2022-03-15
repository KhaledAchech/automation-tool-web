import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTopologiesComponent } from './show-topologies.component';

describe('ShowTopologiesComponent', () => {
  let component: ShowTopologiesComponent;
  let fixture: ComponentFixture<ShowTopologiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTopologiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTopologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
