import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
// import { RegisterComponent } from './auth/register/register.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'products',
    loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent)
  },
  { path: 'products/create', component: ProductFormComponent },
  { path: 'products/edit/:id', component: ProductFormComponent },
  {
    path: 'category',
    loadComponent: () => import('./category/category.component').then(m => m.CategoryComponent)
  },
  { path: 'category/create', component: CategoryFormComponent },
  { path: 'category/edit/:id', component: CategoryFormComponent },
  {
    path: '**',
    redirectTo: '/login'
  }
];