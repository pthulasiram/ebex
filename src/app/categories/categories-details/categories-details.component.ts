import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { map,switchMap } from 'rxjs/operators';
import { defineBase } from '@angular/core/src/render3';
import {Book} from  '../../shared/book';
import { Router,ActivatedRoute } from '@angular/router';
import {BookService} from  '../../shared/book.service';
import {environment} from '../../../environments/environment';
import { SeoService } from '../../shared/seo.service';
@Component({
  selector: 'app-categories-details',
  templateUrl: './categories-details.component.html',
  styleUrls: ['./categories-details.component.css']
})
export class CategoriesDetailsComponent implements OnInit {
  lbtns:string='lbtn';
  rbtns:string='rbtn';
  rBtn:boolean=false;
  lBtn:boolean=false;
  books: Book[] = [];
  result: Book[] = [];
  totalBooks: number = 0;
  no_books_page: number = 4;
  currentPage: number = 1;
  pages: number = 1;
  baseURL: string = 'http://libgen.io/covers/';
  spinner:boolean = true;
  submitted = false;
  success = false;
  category ="";
  showNoBooks:boolean = false;
  data: any = {
    'title': 'EbookdDen - Free '+this.category+'eBooks Download',
    'description': 'All '+this.category+' eBooks available for download for free. Books download in PDF,EPUB...',
    'type': 'article',
    'locale': 'en_US',
    'url': environment.site_url,
    'site_name': environment.site_name
  }
  constructor(private bookService: BookService, public activeRoute: ActivatedRoute, public seo:SeoService) {

  }

  loadPage(page: number, btn?:string) {
    if (this.currentPage <= this.pages) {
      this.currentPage = page;
      this.updateBooksList();
      if(btn =='rbtn'){
        
      } else if(btn=='lbtn'){
        this.lBtn=true;
        this.rBtn=false;
      }
    }
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
  ngOnInit() {
    this.activeRoute.params.forEach(x => {
      console.log(x.id)
      this.category= x.id
      this.getEbooksByTopic(x.id);
    });
  }

  getEbooksByTopic(topic:string){
    this.bookService.getEbooksByTopic(topic).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(books => {
      this.result = books;
     // debugger;
      this.computePagination();
      this.loadPage(this.currentPage);
      this.spinner=false;
      if(this.result.length > 0){
        this.showNoBooks = false;
      }else {
        this.showNoBooks = true
        this.books =[];
      }
      console.log(this.result.length)
    });
    
    this.seo.updatePageMeta(this.data);

  }


 

}
