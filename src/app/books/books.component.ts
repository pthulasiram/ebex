import { Component, OnInit, PLATFORM_ID, Inject} from '@angular/core';
import { SeoService } from '../shared/seo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import { Meta ,Title} from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  data: any = {
    'title': 'EbooksDen - Free IT, Medical, Engineering, Mechanical, Coputer Science eBooks Download',
    'description': 'All eBooks available for  free download. Technology,Biology,Business,Chemistry,Computers,Economy,Education,Mathematics,Medicine,Physics, Programming, Web Development, Computer Science books download in PDF, EPUB...',
    'type': 'website',
    'locale': 'en_US',
    'url': environment.site_url,
    'site_name': environment.site_name
  }
  constructor(@Inject(PLATFORM_ID) private platform: Object,private seo: SeoService, public router: Router,private title: Title,
    private meta: Meta) { }

  ngOnInit() {
    this.data['image'] = './assets/images/logo.png';
    if (isPlatformBrowser(this.platform)) {
      // here you can run any browser specific code, like:
     // window.alert('This will run only in the browser!');
    }
    // this.router.events
    // .subscribe((event) => {
    //   this.seo.updatePageMeta(this.data);
    //   console.log(event);
    // });
    this.seo.updatePageMeta(this.data);
  }

  
}
