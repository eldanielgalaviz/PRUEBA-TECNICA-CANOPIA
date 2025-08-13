import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  onSubmit(): void {
    // Validaciones básicas
    if (!this.username.trim() || !this.password.trim()) {
      this.errorMessage = 'Username and password are required';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.username.trim(), this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        // Redirigir a la página de productos o dashboard
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = err.error?.message || 'Login failed. Please try again.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  // Método para ir a registro
  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}