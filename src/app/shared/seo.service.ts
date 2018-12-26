import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { debug } from 'util';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(private title: Title,
    private meta: Meta) { }

  updatePageMeta(data: any) {
    this.title.setTitle(data.title);
    this.meta.updateTag({
      name: 'description', content: data.description,
    });
    this.meta.updateTag({
      property: 'og.locale', content: data.locale,
    });
    this.meta.updateTag({
      property: 'og.type', content: data.type,
    });
    this.meta.updateTag({
      property: 'og.title', content: data.title,
    });
    this.meta.updateTag({
      property: 'og.url', content: data.url,
    });

    this.meta.updateTag({
      property: 'og.site_name', content: data.site_name,
    });
    //twitter card
    this.meta.updateTag({
      property: 'twitter:card', content: data.title,
    });
    this.meta.updateTag({
      property: 'twitter:description', content: data.description,
    });
    this.meta.updateTag({
      property: 'twitter:title', content: data.title,
    });
  }
  updateArticleMeta(data: any) {
    this.title.setTitle(data.title);
    this.meta.updateTag({
      name: 'description', content: data.description,
    });
    this.meta.updateTag({
      property: 'og:locale', content: data.locale,
    });
    this.meta.updateTag({
      property: 'og:type', content: data.type,
    });
    this.meta.updateTag({
      property: 'og:title', content: data.title,
    });
    this.meta.updateTag({
      property: 'og:description', content: data.title,
    });
    this.meta.updateTag({
      property: 'og:url', content: data.url,
    });

    this.meta.updateTag({
      property: 'og:site_name', content: data.site_name,
    });

    this.meta.updateTag({
      property: 'article:publisher', content: data.publisher,
    });
    data.tags.forEach(element => {
      this.meta.addTag({
        property: 'article:tag', content: element,
      });
    });
    this.meta.updateTag({
      property: 'article:section', content: data.section,
    });
    this.meta.updateTag({
      property: 'article:published_time', content: data.published_time,
    });
// image
    this.meta.updateTag({
      property: 'og:image', content: data.image,
    });
    this.meta.updateTag({
      property: 'og:image:width', content: '381',
    });
    this.meta.updateTag({
      property: 'og:image:height', content:'499',
    });
    this.meta.updateTag({
      property: 'og:image:alt', content: data.title,
    });
   
    // twitter cards

    this.meta.updateTag({
      property: 'twitter:card', content: 'summary_large_image',
    });
    this.meta.updateTag({
      property: 'twitter:description', content: data.description,
    });
    this.meta.updateTag({
      property: 'twitter:title', content: data.title,
    });
    this.meta.updateTag({
      property: 'twitter:image', content: data.image,
    });
 }
  }
