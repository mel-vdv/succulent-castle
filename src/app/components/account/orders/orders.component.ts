import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Commande } from 'src/app/interfaces/commande';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

    user!: User | null;
    @Input()orders?: Commande[];
    detailsVisible:number = -1;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orders'] && !!this.orders) {
    }
  }

}
