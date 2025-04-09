import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
      private trad: TranslateService,
      private seoServ: SeoService
    ) {
    }


  ngOnInit(): void {
    this.trad.get(["seo.home"]).subscribe(data => {
      this.seoServ.updateSeo(data.t, data.d);
    });
  }

}
