import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Book } from './book';
import { Popular } from './popular';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  private dbPath = 'ebooks';
  private popularDbPath = 'popular';
  booksRef: AngularFireList<Book> = null;
  popularEbooksRef: AngularFireList<Popular> = null;
  maxBooks = 40;

  constructor(private db: AngularFireDatabase, private http:HttpClient) {
    this.booksRef = db.list(this.dbPath);
    this.popularEbooksRef = db.list(this.popularDbPath);
  }
  addBook(book: Book): void {
    this.booksRef.push(book);
  }
  updateBook(key: string, value: any): void {
    this.booksRef.update(key, value).catch(error => this.handleError(error));
  }
  deleteBook(key: string): void {
    this.booksRef.remove(key).catch(error => this.handleError(error));
  }
  getAllBooks(): AngularFireList<Book> {
    return this.db.list(this.dbPath, ref => ref.limitToLast(this.maxBooks));
  }
  getEbookById(id: string): AngularFireList<Book> {
    return this.db.list(this.dbPath, ref => ref.orderByChild('id').equalTo(id).limitToFirst(1));
  }
  getEbooksByTitle(title: string): AngularFireList<Book> {
    return this.db.list(this.dbPath, ref => ref.orderByChild('title')
      .startAt(title)
      .endAt(title + '\uf8ff').limitToLast(40));
  }

  getEbooksByTopic(topic: string): AngularFireList<Book> {
    return this.db.list(this.dbPath, ref => ref.orderByChild('topic')
      .startAt(topic)
      .endAt(topic + '\uf8ff').limitToLast(40));
  }
  getEbookByTopic(topic: string): AngularFireList<Book> {
    //console.log(topic)
    if(topic == undefined){
      topic='';
    }
    return this.db.list(this.dbPath, ref => ref.orderByChild('topic').equalTo(topic).limitToLast(2));
  }
  listRelatedBooks(): AngularFireList<Book> {
    return this.db.list(this.dbPath, ref => ref.limitToLast(2));
  }
  deleteAll(): void {
    this.booksRef.remove().catch(error => this.handleError(error));
  }
  getBasePath() {
    return environment.externalPath;
  }
  private handleError(error) {
    console.log(error);
  }
  addPopularBook(book: Popular): void {
    this.popularEbooksRef.push(book);
  }
  getPopularEbookById(id: string): AngularFireList<Popular> {

    return this.db.list(this.popularDbPath, ref => ref.orderByChild('id').equalTo(id).limitToFirst(1));
  }
  updatePopularBook(value: any): void {
    this.popularEbooksRef.update(value.key, value).catch(error => this.handleError(error));
  }

  getTopTenPopularBooks(): AngularFireList<Popular> {
    return this.db.list(this.popularDbPath, ref => ref.orderByChild('hits').startAt(10));
  }

  getEImg(path:string): Observable<any> {
    return this.http.get(path);
  }
}
