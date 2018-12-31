import { Component, OnInit, PLATFORM_ID, Inject} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Book } from '../shared/book';
import { environment } from '../../environments/environment';
import { BookService } from '../shared/book.service';
import { SeoService } from '../shared/seo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Meta ,Title} from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lbtns: string = 'lbtn';
  rbtns: string = 'rbtn';
  rBtn: boolean = false;
  lBtn: boolean = false;
  books: Book[] = [];
  result: Book[] = [];
  totalBooks: number = 0;
  no_books_page: number = 4;
  currentPage: number = 1;
  pages: number = 1;
  books$: Observable<any> = new Observable<any>();
  lastKeypress: number = 0;
  spinner: boolean = true;
  baseURL: string = environment.site_config.imagePath;
  isBanner:boolean = true;

  data: any = {
    'title': 'EbooksDen - Free IT, Medical, Engineering, Mechanical, Coputer Science eBooks Download',
    'description': 'All eBooks available for download for free. Technology,Biology,Business,Chemistry,Computers,Economy,Education,Mathematics,Medicine,Physics, Programming, Web Development, Computer Science books download in PDF, EPUB...',
    'type': 'website',
    'locale': 'en_US',
    'url': environment.site_url,
    'site_name': environment.site_name
  }
  constructor(@Inject(PLATFORM_ID) private platform: Object,private bookService:BookService,private seo: SeoService,private title: Title,
    private meta: Meta) { }
  bookTitle: string = 'Google cloud';
  ngOnInit() {
    this.showBanner();
    this.books$ = this.bookService.searchEbooksByTitle(this.bookTitle, this.bookTitle);
    this.books$.subscribe(books => {
      this.result = books;
      if (this.result.length > 0) {
        // debugger
        this.computePagination();
        this.loadPage(this.currentPage);
        this.spinner = false;
      }
      else {
        this.books = [];
        this.spinner = false;
      }
      
    });
  }

  search($event) {
    if ($event.timeStamp - this.lastKeypress > 200) {
      this.bookTitle = $event.target.value
      this.books$ = this.bookService.searchEbooksByTitle(this.bookTitle, this.bookTitle);
      this.books$.subscribe(books => { this.result = books;
        if (this.result.length > 0) {
          // debugger
          this.computePagination();
          this.loadPage(this.currentPage);
          this.spinner = false;
        }
        else {
          this.books = [];
          this.spinner = false;
        }
      });
    }
    this.lastKeypress = $event.timeStamp
  }

  loadPage(page: number, btn?: string) {
    if (this.currentPage <= this.pages) {
      this.currentPage = page;
      this.updateBooksList();
      if (btn == 'rbtn') {

      } else if (btn == 'lbtn') {
        this.lBtn = true;
        this.rBtn = false;
      }
    }
    window.scrollTo(0,0);
    console.log(this.currentPage + ' ------------------------');
  }

  computePagination() {
    this.totalBooks = this.result.length;
    let total_pages = Math.ceil(this.totalBooks / this.no_books_page);
    this.pages = total_pages;
    // for (let i = 1; i <= total_pages; i++) {
    //   this.pages.push(i);
    // }
    console.log(`total books ${this.totalBooks} ------- pages ${total_pages}`)
  }


  updateBooksList() {
    this.books = [];
    let total_pages = Math.ceil(this.totalBooks / this.no_books_page);

    for (let i = (this.currentPage * this.no_books_page - this.no_books_page); i < (this.currentPage * this.no_books_page) && (i < this.totalBooks); i++) {
      this.books.push(this.result[i]);
    }

  }
  // show new year banner
  showBanner(){
       let currentMonth:number = new Date().getMonth();
      console.log("current month "+ currentMonth)
      if(currentMonth == 0){
      //console.log("Hello from functionNr1 before setTimeout in code");
      setTimeout (() => {
        this.isBanner=false;
        }, 3000);
   
      //console.log("Hello from functionNr1 after setTimeout in code");
      } else {
        this.isBanner= false;
        
      }
   
  }

}
