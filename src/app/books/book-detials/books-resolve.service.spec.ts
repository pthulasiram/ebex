import { TestBed } from '@angular/core/testing';

import { BooksResolveService } from './books-resolve.service';

describe('BooksResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BooksResolveService = TestBed.get(BooksResolveService);
    expect(service).toBeTruthy();
  });
});
