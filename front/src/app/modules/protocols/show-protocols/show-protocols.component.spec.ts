import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProtocolsComponent } from './show-protocols.component';

describe('ShowProtocolsComponent', () => {
  let component: ShowProtocolsComponent;
  let fixture: ComponentFixture<ShowProtocolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProtocolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProtocolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
