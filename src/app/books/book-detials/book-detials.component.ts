import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../../shared/book';
import { Popular } from '../../shared/popular';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BookService } from '../../shared/book.service';
import { environment } from './../../../environments/environment';
import { SeoService } from '../../shared/seo.service';
import { database } from 'firebase';
import { formatDate } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-book-detials',
  templateUrl: './book-detials.component.html',
  styleUrls: ['./book-detials.component.css']
})
export class BookDetialsComponent implements OnInit {
  data: any = {
    'title': '',
    'description': '',
    'type': 'article',
    'locale': 'en_US',
    'url': '',
    'site_name': environment.site_name,

  }

  book$: Observable<any>;
  spinner: boolean = true;
  showNoBooks: boolean = false;
  book: Book[] = null;
  rbooks: Book[] = null;
  showRbooks: boolean = false;
  baseURL: string = "";
  downloadPath: string = "";
  imageBaseURL: string = "";
  constructor(@Inject(PLATFORM_ID) private platform: Object, private router: Router, public activeRoute: ActivatedRoute,
    private title: Title,
    private meta: Meta, public bookService: BookService, public seoService: SeoService) {
    this.baseURL = bookService.getBasePath();
    this.imageBaseURL = environment.site_config.imagePath;
    this.downloadPath = environment.site_config.dPath;
    if (isPlatformBrowser(this.platform)) {
      // here you can run any browser specific code, like:
      // window.alert('This will run only in the browser!');
    }
  }

  ngOnInit() {
    this.data.url = environment.site_url + this.router.url;
    // const queryParams = this.activeRoute.snapshot.queryParams
    const routeParams = this.activeRoute.snapshot.params;
    this.book$ = this.activeRoute.paramMap.pipe(
      switchMap(p => {
        const id = p.get("id");
        console.log(id);
        // this.getBookById(routeParams.id);
        return this.bookService.getEbookById(id).snapshotChanges();
      })

    );
    console.log(routeParams.id)
    this.getBookById(this.book$)

  }

  getBookById(book$: Observable<any>) {

    book$.pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(books => {
      this.book = books;
      this.spinner = false;
      if (this.book.length > 0) {
        this.showNoBooks = false;
      } else {
        this.showNoBooks = true
        this.book = [];
      }
      this.updateMetaData(this.book[0])
      this.spinner = false;
      if (this.book[0].title) {
        this.listRelatedEbooks(this.book[0].topic);
      } else {
        this.listRelatedEbooks('');
      }
      //this.updatePopularEbooks(this.book[0]);
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
    let upatePBooks: boolean = true;
    let addPbook: boolean = true;
    // this.bookService.getPopularEbookById(book.id).snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   )
    // ).subscribe(books => {
    //   pbooks = books[0];
    //   if (pbooks == null && addPbook) {
    //     pbooks = new Popular();
    //     pbooks.id = book.id;
    //     pbooks.title = book.title;
    //     pbooks.coverurl = book.coverurl;
    //     // pbooks.key = book.key;
    //     pbooks.hits = 1;
    //     this.bookService.addPopularBook(pbooks);
    //     addPbook = false;
    //   } else if (upatePBooks) {
    //     pbooks.hits = pbooks.hits + 1;
    //     this.bookService.updatePopularBook(pbooks);
    //     upatePBooks = false;
    //   }

    // });

this.bookService.getPopularEbookById(book.id).valueChanges().subscribe(books => {
  pbooks = books[0];
  if (pbooks == null && addPbook) {
    pbooks = new Popular();
    pbooks.id = book.id;
    pbooks.title = book.title;
    pbooks.coverurl = book.coverurl;
    // pbooks.key = book.key;
    pbooks.hits = 1;
    this.bookService.addPopularBook(pbooks);
    addPbook = false;
  } else if (upatePBooks) {
    pbooks.hits = pbooks.hits + 1;
    this.bookService.updatePopularBook(pbooks);
    upatePBooks = false;
  }

});

  }
  updateMetaData(book: Book) {
    if (Number(book.edition)) {

      let edition: string = ''
      let ed: Number = Number(book.edition);
      if ((ed > 1) && (ed < 10)) {
        edition = ed + ' nd Edition'
      } else if (ed > 9) {
        edition = ed + ' th Edition'
      } else {
        edition = ed + ' st Edition'
      }
      this.data.title = book.title + ' ' + edition + ' - PDF eBook Free Download';
    } else {
      this.data.title = "[" + book.extension.toUpperCase() + '] ' + book.title + ' - PDF eBook Free Download';
    }

    this.data.description = book.title + ' by ' + book.author + ' you’ll learn a solid, rigorous, and practical understanding of ' + book.title + '. Free download pdf';
    this.data['publisher'] = book.publisher;
    let tags: string[] = [];
    tags.push(book.title);
    tags.push(book.author);
    tags.push(book.publisher);
    tags.push(book.year);
    tags.push(book.extension);
    if (book.topic) {
      let topics: string[] = book.topic.split('\\');
      topics.forEach(x => {
        tags.push(x)
      })
      this.data['section'] = book.topic.replace('\\\\', "");
    }
    tags.push('Free Ebook Download')
    //tags.push(topics.toString())
    //topics;
    this.data['tags'] = tags;
    this.data['published_time'] = formatDate(new Date(book.year), 'yyyy-MM-ddTHH:mm:ssZ', 'en');;
    this.data['image'] = this.imageBaseURL + book.coverurl;
    // console.log(this.data.toString())

    this.seoService.updateArticleMeta(this.data);
    this.book[0].title = this.data.title;

  }

  updateArticleMeta(data: any) {
    let metadata: any = [
      { name: 'description', content: data.description },
      { property: 'og:locale', content: data.locale },
      { property: 'og:type', content: data.type },
      { property: 'og:type', content: data.type },
      { property: 'og:title', content: data.title },
      { property: 'og:description', content: data.title },
      { property: 'og:url', content: data.url },
      {
        property: 'og:url', content: data.url,
      }, {
        property: 'og:site_name', content: data.site_name,
      }, {
        property: 'article:publisher', content: data.publisher,
      }, {
        property: 'article:section', content: data.section,
      }, {
        property: 'article:published_time', content: data.published_time,
      }, {
        property: 'og:image', content: data.image,
      }, {
        property: 'og:image:width', content: '381',
      }, {
        property: 'og:image:height', content: '499',
      }, {
        property: 'og:image:alt', content: data.title,
      }, {
        property: 'twitter:card', content: 'summary',
      }, {
        property: 'twitter:description', content: data.description,
      }, {
        property: 'twitter:url', content: data.url,
      }, {
        property: 'twitter:title', content: data.title,
      }, {
        property: 'twitter:image', content: data.image,
      }, {
        property: 'twitter:site', content: '@DenEbooks',
      }, {
        property: 'twitter:creator', content: '@DenEbooks',
      }];

    data.tags.forEach(element => {
      if (element != undefined && element != "") {
        metadata.push({
          property: 'article:tag', content: element,
        });
      }
    });
    debugger
    this.meta.addTags(metadata, true)
    //debugger;
  }

  getImage(path: string) {
    console.log(' path   '+path)
    return this.getImage(path).subscribe(x =>{
      console.log(x);
    });
  }
}
