import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BookService } from './shared/book.service';
import { Book } from './shared/book';

@Injectable()
export class BooksResolver implements Resolve<any> {
    bookTitle: string = 'Google cloud';
     books_data: any = undefined
    constructor(private http: HttpClient, private bookService: BookService,) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        let id: any = route.params['id']; 
        console.log(" invoked books resovler to fech book title "+id)
        return Observable.create((observer) => {
            observer.next( this.bookService.getEbookById(id).valueChanges().pipe(
                map((dataFromApi:any) => dataFromApi),
                catchError((err) => Observable.throw(err.json().error))
            ));
            observer.complete();
              });

    }
}