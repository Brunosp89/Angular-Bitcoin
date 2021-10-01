import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Response {
  time: {
    updated: string;
  };
  disclaimer: string;
  bpi: {
    [key in 'USD' | 'EUR' | 'GBP']: {
      symbol: string;
      description: string;
      rate_float: number;
      rate: number;
    };
  };
}

interface PriceUpdate {
  timestamp: Date;
  USD: number;
  EUR: number;
  GBP: number;
}
@Injectable()
export class BrunoWalletService {
  currentPrice: Response;
  lastUpdate: Date;
  saldo: number;
  valorAtualUSD: number;
  valorAtualEUR: number;
  valorAtualGBP: number;
  ultimaUSD: number;
  ultimaEUR: number;
  ultimaGBP: number;

  updateList: Array<PriceUpdate> = [];

  constructor(private http: HttpClient) {
    this.saldo = 0;
  }

  update() {
    this.http
      .get<Response>('https://api.coindesk.com/v1/bpi/currentprice.json')
      .subscribe((data) => {
        this.lastUpdate = new Date();
        this.currentPrice = data;
        this.setValorAtualUSD();
        this.setValorAtualEUR();
        this.setValorAtualGBP();
        this.compareUSD();
        this.compareEUR();
        this.compareGBP();
        this.ultimaUSD = this.currentPrice.bpi.USD.rate_float;
        this.ultimaEUR = this.currentPrice.bpi.EUR.rate_float;
        this.ultimaGBP = this.currentPrice.bpi.GBP.rate_float;
        this.updateList.push({
          timestamp: this.lastUpdate,
          USD: this.currentPrice.bpi.USD.rate_float,
          EUR: this.currentPrice.bpi.EUR.rate_float,
          GBP: this.currentPrice.bpi.GBP.rate_float,
        });
      });
  }
  private timer: any;
  private counter = 60;

  start(ms: number) {
    if (!this.timer) {
      this.timer = setInterval(() => {
        this.counter--;
        if (this.counter == 0) {
          this.update();
          this.counter = 60;
        }
      }, ms);
    }
  }

  getCount() {
    return this.counter;
  }

  setValorAtualUSD() {
    if (this.valorAtualUSD === undefined) {
      this.valorAtualUSD = this.currentPrice.bpi.USD.rate_float;
    }
  }

  setValorAtualEUR() {
    if (this.valorAtualEUR === undefined) {
      this.valorAtualEUR = this.currentPrice.bpi.EUR.rate_float;
    }
  }

  setValorAtualGBP() {
    if (this.valorAtualGBP === undefined) {
      this.valorAtualGBP = this.currentPrice.bpi.GBP.rate_float;
    }
  }

  compareUSD() {
    if (this.ultimaUSD > this.valorAtualUSD) {
      return ' ↑ ';
    } else if (this.ultimaUSD < this.valorAtualUSD) {
      return ' ↓ ';
    } else {
      return ' - ';
    }
  }

  compareEUR() {
    if (this.ultimaEUR > this.valorAtualEUR) {
      return ' ↑ ';
    } else if (this.ultimaEUR < this.valorAtualEUR) {
      return ' ↓ ';
    } else {
      return ' - ';
    }
  }

  compareGBP() {
    if (this.ultimaGBP > this.valorAtualGBP) {
      return ' ↑ ';
    } else if (this.ultimaGBP < this.valorAtualGBP) {
      return ' ↓ ';
    } else {
      return ' - ';
    }
  }
}
