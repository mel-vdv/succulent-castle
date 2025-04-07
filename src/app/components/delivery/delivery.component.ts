import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ObjetAddress } from 'src/app/interfaces/address';
import { AuthService } from 'src/app/services/auth.service';
import { CrudsService } from 'src/app/services/cruds.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit, OnChanges {

  user!: User | null;
  @Input()address2?: ObjetAddress;
  f: FormGroup;
  @Output()countrySelect = new EventEmitter<string>();
  edit?: boolean;

  constructor(
    private crud: CrudsService,
    private authServ: AuthService
  ) {
      this.f = new FormGroup({
        prenom: new FormControl('', Validators.required),
        nom: new FormControl('', Validators.required),
        adres: new FormControl('', Validators.required),
        compl: new FormControl(''),
        cp: new FormControl('', Validators.required),
        ville: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        tel: new FormControl('', Validators.required),
      });
  }

  ngOnInit(): void {
    this.getUser();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['address2'] && !!this.address2) {
      this.getValue();
    }
  }

  changeCountry(pays: string) {
    this.countrySelect.emit(pays);
  }
  

  editer() {
    this.edit = true;
  }

  getUser() {
    this.authServ.user$.subscribe((user) => {
      this.user = user;
    });
  }

  getValue() {
    this.f.patchValue(this.address2!);
  }

  onSubmit() {
    if (!!this.user?.uid) {
      
      this.crud.updateAddress(this.user.uid, this.f.value).then(()=> 
        {
          this.address2 = this.f.value;
          this.edit = false;
          this.changeCountry(this.f.get('country')?.value);
        });
    }
    else {
      this.authServ.loginWithGoogle().subscribe();
    }
  }
}
