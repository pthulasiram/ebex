import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetialsComponent } from './book-detials.component';

describe('BookDetialsComponent', () => {
  let component: BookDetialsComponent;
  let fixture: ComponentFixture<BookDetialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDetialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
