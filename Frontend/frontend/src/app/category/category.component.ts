import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService, Category } from './category.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule ],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category: Category[] = [];
  searchTerm = '';

  constructor(private categoryService: CategoryService,private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory(): void {
    this.categoryService.getCategory().subscribe(data => {
      this.category = data;
    });
  }

  search(): void {
    if (this.searchTerm.trim()) {
      this.categoryService.searchCategory(this.searchTerm).subscribe(response => {
       if (Array.isArray(response)) {
          this.category = response;
        } else if (response) {
          this.category = [response]; 
        } else {
          this.category = [];
        }

      });
    } else {
      this.loadCategory();
    }
  }

  deleteCategory(id: number): void {
    if (confirm('¿Seguro que quieres eliminar este Categoria?')) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.loadCategory();
      });
    }
  }
  goToProducts(): void {
    this.router.navigate(['/products']);
  }
}
