import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService, Product } from '../products.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  product: Product = { name: '', price: 0, description: '' };
  isEdit = false;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.productsService.getProducts().subscribe(products => {
        const found = products.find(p => p.id === Number(id));
        if (found) this.product = found;
      });
    }
  }

  save(): void {
    if (this.isEdit && this.product.id) {
      this.productsService.updateProduct(this.product.id, this.product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else {
      this.productsService.createProduct(this.product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }
}
