import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService, Category } from '../category.service';
import { Route } from '@angular/router';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-form.component.html'
})
export class CategoryFormComponent implements OnInit {
  Category: Category = { name: '', price: 0, description: '', category_id: '' };
  isEdit = false;

  constructor(
    private CategoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.CategoryService.getCategory().subscribe(Category => {
        const found = Category.find(p => p.id === Number(id));
        if (found) this.Category = found;
      });
    }
  }

  save(): void {
    if (this.isEdit && this.Category.id) {
      this.CategoryService.updateCategory(this.Category.id, this.Category).subscribe(() => {
        this.router.navigate(['/Category']);
      });
    } else {
      this.CategoryService.createCategory(this.Category).subscribe(() => {
        this.router.navigate(['/Category']);
      });
    }
  }
        goToProducts(): void {
    this.router.navigate(['/products']);
  }
}
