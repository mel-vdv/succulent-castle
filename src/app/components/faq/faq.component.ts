import { Component, OnInit } from '@angular/core';

import { faq } from '../../constantes/faq';
import { TranslateService } from '@ngx-translate/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})

export class FaqComponent implements OnInit {

  choix = "";
  choisir(choix : string) {
    this.choix = choix;
  }

  constructor(
      private trad: TranslateService,
      private seoServ: SeoService) { }

  ngOnInit(): void {
    this.trad.get(["seo.faq"]).subscribe(data => {
      this.seoServ.updateSeo(data.t, data.d);
    });
  }

  faq: [string, [string, string][] ] [] = faq;
}


