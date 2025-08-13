
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id?: number;
  name: string;
  price: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000/products'; // 

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    const token = localStorage.getItem('token'); 
    return this.http.get<any[]>(this.apiUrl, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }


  searchProducts(query: string): Observable<Product[]> {
  const token = localStorage.getItem('token'); 
  return this.http.get<Product[]>(`${this.apiUrl}/${query}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

createProduct(product: Product): Observable<Product> {
  const token = localStorage.getItem('token');
  return this.http.post<Product>(this.apiUrl, product, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

updateProduct(id: number, product: Product): Observable<Product> {
  const token = localStorage.getItem('token');
  return this.http.put<Product>(`${this.apiUrl}/${id}`, product, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

deleteProduct(id: number): Observable<void> {
  const token = localStorage.getItem('token');
  return this.http.delete<void>(`${this.apiUrl}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
}


