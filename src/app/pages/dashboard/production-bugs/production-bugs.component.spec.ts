import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionBugsComponent } from './production-bugs.component';

describe('ProductionBugsComponent', () => {
  let component: ProductionBugsComponent;
  let fixture: ComponentFixture<ProductionBugsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionBugsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionBugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
