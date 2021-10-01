import { Component, OnInit } from '@angular/core';
import { BrunoWalletService } from '../bruno-wallet.service';

@Component({
  selector: 'app-bruno-currency',
  templateUrl: './bruno-currency.component.html',
  styleUrls: ['./bruno-currency.component.css'],
})
export class BrunoCurrencyComponent implements OnInit {
  constructor(public brunoWalletService: BrunoWalletService) {}

  ngOnInit() {}
  getCurrentPrice() {
    return this.brunoWalletService.currentPrice;
  }

  update() {
    this.brunoWalletService.update();
  }
}
