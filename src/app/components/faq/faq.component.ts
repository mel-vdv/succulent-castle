import { Component, OnInit } from '@angular/core';

import { faq } from '../../constantes/faq';

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

  constructor() { }

  ngOnInit(): void {
  }

  faq: [string, [string, string][] ] [] = faq;
}


