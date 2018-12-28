import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { SeoService } from '../shared/seo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment'
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  data: any = {
    'title': 'EbookdDen - Free IT, Medical, Engineering, Mechanical, Coputer Science eBooks Download',
    'description': 'All eBooks available for download for free. Technology,Biology,Business,Chemistry,Computers,Economy,Education,Mathematics,Medicine,Physics, Programming, Web Development, Computer Science books download in PDF, EPUB...',
    'type': 'website',
    'locale': 'en_US',
    'url': environment.site_url,
    'site_name': environment.site_name
  }
  constructor(private seo: SeoService, public router: Router) { }

  ngOnInit() {
    this.data['image'] = './assets/images/logo.png';
    this.router.events
    .subscribe((event) => {
      this.seo.updatePageMeta(this.data);
      console.log(event);
    });
    this.seo.updatePageMeta(this.data);
  }
}
