import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { BrunoCurrencyComponent } from './bruno-currency/bruno-currency.component';
import { BrunoWalletComponent } from './bruno-wallet/bruno-wallet.component';
import { BrunoWalletService } from './bruno-wallet.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'bruno-currency', component: BrunoCurrencyComponent },
      { path: 'bruno-wallet', component: BrunoWalletComponent },
    ]),
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    BrunoCurrencyComponent,
    BrunoWalletComponent,
  ],
  bootstrap: [AppComponent],
  providers: [BrunoWalletService],
})
export class AppModule {}
