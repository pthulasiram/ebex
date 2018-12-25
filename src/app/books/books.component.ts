import { Component, OnInit } from '@angular/core';
import { SeoService } from '../shared/seo.service';
import { environment } from '../../environments/environment'
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  data: any = {
    'title': 'EbookdDen - Free Medical, Engineering, Mechanical, Coputer Science eBooks Download',
    'description': 'All eBooks available for download for free.Medical,Engineering,comics, Programming, Web Development, Computer Science books download in PDF,EPUB...',
    'type': 'website',
    'locale': 'en_US',
    'url': environment.site_url,
    'site_name': environment.site_name
  }
  constructor(private seo: SeoService) { }

  ngOnInit() {
    this.seo.updatePageMeta(this.data);
  }

}
