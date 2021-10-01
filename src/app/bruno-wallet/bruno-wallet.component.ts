import { Component, OnInit } from '@angular/core';
import { BrunoWalletService } from '../bruno-wallet.service';

@Component({
  selector: 'app-bruno-wallet',
  templateUrl: './bruno-wallet.component.html',
  styleUrls: ['./bruno-wallet.component.css'],
})
export class BrunoWalletComponent implements OnInit {
  compra: number;
  venda: number;
  preco: number;
  constructor(public bitcoinService: BrunoWalletService) {
    this.compra = 0;
    this.venda = 0;
    this.preco = this.bitcoinService.currentPrice.bpi.USD.rate_float;
  }

  ngOnInit() {
    this.update();
  }

  getCurrentPrice() {
    return this.bitcoinService.currentPrice;
  }

  update() {
    this.bitcoinService.update();
  }

  getCompraBitcoin() {
    return this.compra;
  }

  getVendaBitcoin() {
    return this.venda;
  }

  getValorCompra() {
    return this.compra * this.preco;
  }

  getValorVenda() {
    return this.venda * this.preco;
  }

  getValorBitcoin() {
    return this.compra - this.venda;
  }

  getTotal() {
    return this.compra - this.venda;
  }

  getValorTotal() {
    return (this.compra - this.venda) * this.preco;
  }

  getSaldo() {
    return this.bitcoinService.saldo;
  }

  setSaldo() {
    if (this.bitcoinService.saldo < this.venda) {
      return alert('Saldo Insuficiente');
    }
    this.bitcoinService.saldo =
      this.bitcoinService.saldo + (this.compra - this.venda);
    this.compra = 0;
    this.venda = 0;
  }
}
