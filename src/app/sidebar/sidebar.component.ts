import { Component, OnInit } from '@angular/core';
import {Popular} from '../shared/popular';
import {BookService} from '../shared/book.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  popularEbooks: Popular[] = [];
  tags: string[] = ['Technology',
    'Biology',
    'Art',
    'Business',
    'Chemistry',
    'Computers',
    'Geography',
    'Geology',
    'Economy',
    'Education',
    'Jurisprudence',
    'Housekeeping',
    'History',
    'Linguistics',
    'Literature',
    'Mathematics',
    'Medicine',
    'Other Social Sciences',
    'Physics',
    'Psychology',
    'Religion',
    'Science'];
  topics: string[] = ['Technology',
    'Biology',
    'Business',
    'Chemistry',
    'Computers',
    'Economy',
    'Education',
    'Mathematics',
    'Medicine',
    'Physics',
    ];

  baseURL: string = "";
  imageBaseURL: string = "";
  constructor(private bookService: BookService) {
    this.baseURL = bookService.getBasePath();
    this.imageBaseURL = this.baseURL + "covers/"
  }

  ngOnInit() {
    this.getEbookList()
  }

  getEbookList() {
    // Use snapshotChanges().map() to store the key
    this.bookService.getTopTenPopularBooks().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(books => {
      this.popularEbooks = books;
      //debugger
    });
  }

}
