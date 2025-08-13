
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  id?: number;
  name: string;
  price: number;
  description: string;
  category_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/categories'; // 

  constructor(private http: HttpClient) {}

  getCategory(): Observable<any[]> {
    const token = localStorage.getItem('token'); 
    return this.http.get<any[]>(this.apiUrl, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }


  searchCategory(query: string): Observable<Category[]> {
  const token = localStorage.getItem('token'); 
  return this.http.get<Category[]>(`${this.apiUrl}/${query}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

createCategory(category: Category): Observable<Category> {
  const token = localStorage.getItem('token');
  return this.http.post<Category>(this.apiUrl, category, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

updateCategory(id: number, category: Category): Observable<Category> {
  const token = localStorage.getItem('token');
  return this.http.put<Category>(`${this.apiUrl}/${id}`, category, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

deleteCategory(id: number): Observable<void> {
  const token = localStorage.getItem('token');
  return this.http.delete<void>(`${this.apiUrl}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
}


