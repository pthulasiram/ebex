import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Book } from '../../shared/book';
import { Popular } from '../../shared/popular';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BookService } from '../../shared/book.service';
import {environment} from './../../../environments/environment';
import { SeoService } from '../../shared/seo.service';
import { database } from 'firebase';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-book-detials',
  templateUrl: './book-detials.component.html',
  styleUrls: ['./book-detials.component.css']
})
export class BookDetialsComponent implements OnInit {
  data: any = {
    'title': 'EbookdDen - Free Medical, Engineering, Mechanical, Coputer Science eBooks Download',
    'description': 'All eBooks available for download for free.Medical,Engineering,comics, Programming, Web Development, Computer Science books download in PDF,EPUB...',
    'type': 'article',
    'locale': 'en_US',
    'url': '',
    'site_name': environment.site_name,
    
  }
  book$:Observable<any>;
  spinner:boolean = true;
  book: Book[] = null;
  rbooks: Book[] = null;
  showRbooks: boolean = false;
  baseURL: string = "";
  downloadPath:string="";
  imageBaseURL: string = "";
  constructor(private router: Router,public activeRoute: ActivatedRoute, public bookService: BookService, public seoService:SeoService) {
    this.baseURL = bookService.getBasePath();
    this.imageBaseURL = this.baseURL + "covers/";
    this.downloadPath = "http://library1.org/_ads/";
  }

  ngOnInit() {
    this.data.url = environment.site_url+this.router.url;
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
      this.updateMetaData(this.book[0])
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
  updateMetaData(book:Book){
    this.data.title= book.title+' - PDF eBook Free Download';
    this.data.description = book.title+' by '+ book.author+' you’ll learn a solid, rigorous, and practical understanding of '  +book.title+'. Free download pdf';
    this.data['publisher']= book.publisher;
    let tags:string[] = [];
    tags.push(book.title);
    tags.push(book.author);
    tags.push(book.publisher);
    tags.push(book.year);
    tags.push(book.extension);
    if(book.topic) {
    let  topics:string[] = book.topic.split('///');
    topics.forEach( x =>{
      tags.push(x)
    })
    this.data['section']= book.topic;
  }
    tags.push('Free Ebook Download')
    //tags.push(topics.toString())
   //topics;
   this.data['tags']=tags;
   this.data['published_time']=formatDate(new Date(book.year), 'yyyy-MM-ddTHH:mm:ssZ', 'en');;
   this.data['image']=this.imageBaseURL+book.coverurl;
  // console.log(this.data.toString())

    this.seoService.updateArticleMeta(this.data)   ;
  }

}
