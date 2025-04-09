import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private title: Title,
    private meta: Meta
  ) { }

  updateSeo(title: string, descr: string) {
    this.title.setTitle(title);
    this.meta.updateTag({name: "description", content: descr});
  }
}
