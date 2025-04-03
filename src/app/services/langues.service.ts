import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguesService {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('fr');
    translate.use('fr');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
