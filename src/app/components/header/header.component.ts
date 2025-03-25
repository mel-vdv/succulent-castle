import { Component, OnInit } from '@angular/core';
import { LanguesService } from 'src/app/services/langues.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private langServ: LanguesService
  ) { }

  ngOnInit(): void {
  }

  switchLang(lang: string) {
    this.langServ.switchLanguage(lang);
  }

  navig(url: string) {
    window.open(url, '_blank');
  }

}
