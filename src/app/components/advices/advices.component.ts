import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-advices',
  templateUrl: './advices.component.html',
  styleUrls: ['./advices.component.scss']
})
export class AdvicesComponent implements OnInit {

  constructor(
        private trad: TranslateService,
        private seoServ: SeoService
  ) { }

  ngOnInit(): void {
    this.trad.get(["seo.advices"]).subscribe(data => {
      this.seoServ.updateSeo(data.t, data.d);
    });
  }

}
