import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudsService } from 'src/app/services/cruds.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {

  email?: string;
  f: FormGroup;
  notif?: string;

  constructor(
    private crud: CrudsService
  ) {
      this.f = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        acceptTerms: new FormControl(false, Validators.requiredTrue)
      });}

  ngOnInit(): void {
  }

  onSubmit() {
    this.crud.addAbonne(this.f.get('email')?.value).then(
      () => this.notif = "nl-notif"
    );
  }

}
