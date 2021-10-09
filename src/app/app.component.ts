import { Component, VERSION } from '@angular/core';
import { BrunoWalletService } from './bruno-wallet.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'CarteiraVirtual App';

  constructor(public brunoWalletService: BrunoWalletService) {
    this.brunoWalletService.start(1000);
  }

  valorAtualUSD: number;
  valorAtualEUR: number;
  valorAtualGBP: number;
  ultimaUSD: number;
  ultimaEUR: number;
  ultimaGBP: number;

  ngOnInit() {
    this.update();
  }
  getCurrentPrice() {
    return this.brunoWalletService.currentPrice;
  }
  update() {
    this.brunoWalletService.update();
  }
  getCompareUSD() {
    return this.brunoWalletService.compareUSD();
  }
  /*
  getCompareEUR() {
    return this.brunoWalletService.compareEUR();
  }

  getCompareGBP() {
    return this.brunoWalletService.compareGBP();
  }
  */
}
