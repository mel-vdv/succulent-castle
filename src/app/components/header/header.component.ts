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

  isMobile = false;

  ngOnInit(): void {
    this.isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  switchLang(lang: string) {
    this.langServ.switchLanguage(lang);
  }

  navig(url: string) {
    window.open(url, '_blank');
  }

}
