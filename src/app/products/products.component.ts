import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { PRODUCTS } from '../mock-products';
import { ProductService } from '../product.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  selectedProduct ?: Product;
  
  products : Product [] = [];
  
  constructor(private productService: ProductService, private messageService: MessageService) { 
    
  }

  ngOnInit(): void {
    this.getProducts();
  }
  
    getProducts() : void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  
  
  
  


 

}
