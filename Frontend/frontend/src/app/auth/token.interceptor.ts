import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('🔍 Interceptor ejecutado para:', req.url);

  // Agregar token a la petición
  const token = authService.getToken();
  if (token) {
    console.log('🔑 Token agregado a la petición');
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('🚨 Error capturado:', error.status, error.message);
      
      if (error.status === 401) {
        console.log('🔒 Sesión expirada detectada');
        
        alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
        authService.logout();
        router.navigate(['/login']);
      }
      
      return throwError(() => error);
    })
  );
};