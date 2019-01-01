import { Component, OnInit, PLATFORM_ID, Inject} from '@angular/core';
import { environment } from '../../environments/environment'
import { Meta ,Title} from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { SeoService } from '../shared/seo.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
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
  cards: string[] = [
    'bg-primary', 'bg-success', 'bg-info', 'bg-warning', 'bg-danger', 'bg-secondary', 'bg-dark', 'bg-light'
  ]
  tempIndex:number = this.cards.length-1;
  data: any = {
    'title': 'Categories - Free IT, Medical, Engineering, Mechanical, Coputer Science eBooks Download',
    'description': 'Search ebooks for these categories Technology,Biology,Business,Chemistry,Computers,Economy,Education,Mathematics,Medicine,Physics, Programming, Web Development, Computer Science books download in PDF, EPUB...',
    'type': 'website',
    'locale': 'en_US',
    'url': environment.site_url,
    'site_name': environment.site_name
  }
  constructor(@Inject(PLATFORM_ID) private platform: Object,private seo: SeoService,private title: Title,
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

  updateClass( index:number):string {
    if(index > this.cards.length && this.tempIndex > 0){
      index =this.tempIndex;
    } 
    if(this.tempIndex < 0){
      this.tempIndex = this.cards.length-1;
    }
    let x:string  =  'col-12 col-md-6 px-25 card text-white '
    +(this.cards[index]=='undefined'?'bg-secondary':this.cards[index]);
    console.log(x)
    this.tempIndex = this.tempIndex-1;
    return x;
  }
}
