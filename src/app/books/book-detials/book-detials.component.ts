import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../shared/book';
import { Popular } from '../../shared/popular';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BookService } from '../../shared/book.service';
@Component({
  selector: 'app-book-detials',
  templateUrl: './book-detials.component.html',
  styleUrls: ['./book-detials.component.css']
})
export class BookDetialsComponent implements OnInit {
  book$:Observable<any>;
  spinner:boolean = true;
  book: Book[] = null;
  rbooks: Book[] = null;
  showRbooks: boolean = false;
  baseURL: string = "";
  downloadPath:string="";
  imageBaseURL: string = "";
  constructor(public activeRoute: ActivatedRoute, public bookService: BookService) {
    this.baseURL = bookService.getBasePath();
    this.imageBaseURL = this.baseURL + "covers/";
    this.downloadPath = "http://library1.org/_ads/";
  }

  ngOnInit() {
    const queryParams = this.activeRoute.snapshot.queryParams
    const routeParams = this.activeRoute.snapshot.params;
    this.book$ = this.activeRoute.paramMap.pipe(
      switchMap( p => {
        const id = p.get("id")
        console.log(id);
       // this.getBookById(routeParams.id);
        return this.bookService.getEbookById(id).snapshotChanges();
      })
    
    );
    this.getBookById(this.book$)

  }

  getBookById(book$: Observable<any>) {
    book$.pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(books => {
      this.book = books;
      this.spinner =false;
      if(this.book[0].title){
      this.listRelatedEbooks(this.book[0].topic);
      } else{
        this.listRelatedEbooks('');
      }
      this.updatePopularEbooks(this.book[0]);
    });
  }

  listRelatedEbooks(topic: string) {
    
    this.bookService.getEbookByTopic(topic).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(books => {
      this.rbooks = books;
      let size: number = this.rbooks.length;
      if (!(size == 2)) {
        this.updateRelatedEbooks();
        this.showRbooks = false;
      } else {
        this.showRbooks = true;
      }
      //debugger;
    });
  }
  updateRelatedEbooks() {
    this.bookService.listRelatedBooks().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(books => {
      this.showRbooks = true;
      this.rbooks = books;
      //debugger
    });
  }
  OnChagneEbook(index: number) {
    this.book[0] = this.rbooks[index];
    this.activeRoute.snapshot.params.id = this.book[0].id;
  }
  updatePopularEbooks(book: Book) {
    let pbooks: Popular = null;

    this.bookService.getPopularEbookById(book.title).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(books => {
      pbooks = books[0];
    });

    if (pbooks == null) {
      pbooks = new Popular();
      pbooks.id = book.id;
      pbooks.title = book.title;
      pbooks.coverurl = book.coverurl;
      // pbooks.key = book.key;
      pbooks.hits = 1;
      this.bookService.addPopularBook(pbooks);
    } else {
      //  debugger
      pbooks.hits = pbooks.hits + 1;
      this.bookService.updatePopularBook(pbooks.key$, pbooks);
    }

  }

}
