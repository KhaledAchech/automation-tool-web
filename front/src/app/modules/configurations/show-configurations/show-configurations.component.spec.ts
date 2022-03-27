import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowConfigurationsComponent } from './show-configurations.component';

describe('ShowConfigurationsComponent', () => {
  let component: ShowConfigurationsComponent;
  let fixture: ComponentFixture<ShowConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowConfigurationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
