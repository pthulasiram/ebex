import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

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
  }
    
  }
