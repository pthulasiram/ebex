import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { BookService } from '../../shared/book.service';
import { Book } from '../../shared/book';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable()
export class BooksResolveService implements Resolve<any> {
  books: Observable<any> = undefined;
  constructor(private bookService: BookService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let id: any = route.params['id'];
    return 
  }
}
