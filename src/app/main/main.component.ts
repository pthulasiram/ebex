import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Book} from  '../shared/book';
import {BookService} from  '../shared/book.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  searchForm:FormGroup;
  constructor(private bookService: BookService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    window.scrollTo(0,0);
    this.searchForm = this.formBuilder.group({
      title: ['', Validators.required]
    });
  }

  searchEbooksByTitle(){
   
    window.scrollTo(0,0);
  }
  clear(){
    this.searchForm.controls.title.setValue('')
  }
}
