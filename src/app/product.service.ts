import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './products/product';
import { PRODUCTS } from './mock-products';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = 'http://localhost:3030/product/listAllProducts';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  };

  constructor(private messageService: MessageService, private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    
    this.log('list fetched');
    return this.http.get<Product[]>(this.productUrl).pipe(
      tap(_ => this.log('fetched products')),
      catchError(this.handleError<Product[]>('getProducts', []))
    );
  };

  getProduct(id: number): Observable<Product> {

    const product = PRODUCTS.find(p => p.id === id)!;
    this.log(`fetched product id=${id}`);
    return of(product);
  }

  private log(message: string) {
    this.messageService.add(`ProductService: ${message}`);
  }

}
