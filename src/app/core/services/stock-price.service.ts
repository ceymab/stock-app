import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { Stock } from 'src/app/models/stock.model';

@Injectable({ providedIn: 'root' })
export class StockPriceService {
  private stocks: Stock[] = [
    { name: 'Apple', symbol: 'AAPL', price: 190.25, high: 195, low: 185.5, week52High: 210, week52Low: 150, isActive: true, prevPrice: 188.45 },
    { name: 'Alphabet', symbol: 'GOOG', price: 1016.92, high: 1030, low: 1000, week52High: 1200, week52Low: 950, isActive: true, prevPrice: 1002 },
    { name: 'Microsoft', symbol: 'MSFT', price: 57.82, high: 60, low: 55, week52High: 70, week52Low: 50, isActive: true, prevPrice: 55 },
    { name: 'Tesla', symbol: 'TSLA', price: 240.15, high: 245, low: 230, week52High: 300, week52Low: 180, isActive: true, prevPrice: 238 }
  ];

  private stockSubject = new BehaviorSubject<Stock[]>(this.stocks);
  getStockList$ = this.stockSubject.asObservable();

  constructor() {
    interval(3000).subscribe(() => {
      this.stocks = this.stocks.map(stock => {
        if (!stock.isActive) return stock;

        const randomChange = Math.random() * 4 - 2;
        const updatedPrice = stock.price + randomChange;
        const newPrice = Number(updatedPrice.toFixed(2));


        return { ...stock, prevPrice: stock.price, price: newPrice };
      });

      this.stockSubject.next(this.stocks);
    });
  }

  toggleStock(symbol: string) {
    this.stocks = this.stocks.map(stock =>
      stock.symbol === symbol ? { ...stock, isActive: !stock.isActive } : stock
    );
    this.stockSubject.next(this.stocks);
  }
}
