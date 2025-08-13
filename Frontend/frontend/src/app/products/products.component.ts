import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService, Product } from './products.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  searchTerm = '';

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productsService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  search(): void {
    if (this.searchTerm.trim()) {
      this.productsService.searchProducts(this.searchTerm).subscribe(response => {
       if (Array.isArray(response)) {
          this.products = response;
        } else if (response) {
          this.products = [response]; // Convertir un solo producto en array
        } else {
          this.products = [];
        }

      });
    } else {
      this.loadProducts();
    }
  }

  deleteProduct(id: number): void {
    if (confirm('¿Seguro que quieres eliminar este producto?')) {
      this.productsService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }
  
}
