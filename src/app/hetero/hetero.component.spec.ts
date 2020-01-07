import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeteroComponent } from './hetero.component';

describe('HeteroComponent', () => {
  let component: HeteroComponent;
  let fixture: ComponentFixture<HeteroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeteroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeteroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
