import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-rgpd',
  templateUrl: './rgpd.component.html',
  styleUrls: ['./rgpd.component.scss']
})
export class RgpdComponent implements OnInit {

  constructor(
      private trad: TranslateService,
      private seoServ: SeoService) { }

  ngOnInit(): void {    
    this.trad.get(["seo.rgpd"]).subscribe(data => {
      this.seoServ.updateSeo(data.t, data.d);
    });
  }

}
