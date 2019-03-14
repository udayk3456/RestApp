import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestGetTestComponent } from './rest-get-test.component';

describe('RestGetTestComponent', () => {
  let component: RestGetTestComponent;
  let fixture: ComponentFixture<RestGetTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestGetTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestGetTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
