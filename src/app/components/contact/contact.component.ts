import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudsService } from 'src/app/services/cruds.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  f: FormGroup;
  notif= "";
  color= "dark";

  constructor(
    public router: Router,
    private crud: CrudsService
  ) {
    this.f = new FormGroup({
      firstname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(''),
      objet: new FormControl('', Validators.required),
      message: new FormControl('', [Validators.required]),
      acceptTerms: new FormControl(false, Validators.requiredTrue)
    });

   }

  ngOnInit(): void {
  }

  onSubmit() {
    this.crud.addMessage(
      { to: ["thesucculentcastle@gmail.com",],
      message: {
        subject: `SUCCULENT CASTLE : ${this.f.get('objet')?.value}`,
        text:`Message de ${this.f.get('firstname')?.value} (${this.f.get('email')?.value})  : ${this.f.get('message')?.value}`,
        html: `<h3> Nouveau message sur SUCCULENT CASTLE </h3> 
        <p> de la part de ${this.f.get('firstname')?.value} ${this.f.get('lastname')?.value} </p>
        <p> Email : ${this.f.get('email')?.value}</p>
        <p> Tel : ${this.f.get('phone')?.value} </p>
        <p> Message :</p> 
        <p>"${this.f.get('message')?.value}"</p>`
        
      }}
      
    )
    .then(() => {
      this.notif='VOTRE MESSAGE A ETE ENVOYE AVEC SUCCES';
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 3000);
    });
  }
}
