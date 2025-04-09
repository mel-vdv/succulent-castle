import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-cgv',
  templateUrl: './cgv.component.html',
  styleUrls: ['./cgv.component.scss']
})
export class CgvComponent implements OnInit {

  constructor(
      private trad: TranslateService,
      private seoServ: SeoService) { }

  ngOnInit(): void {
    this.trad.get(["seo.cgv"]).subscribe(data => {
      this.seoServ.updateSeo(data.t, data.d);
    });
  }

}
