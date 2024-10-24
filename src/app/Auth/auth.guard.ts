import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // Permite o acesso à rota
    } else {
      // Redireciona para a página de login
      this.router.navigate(['/login']);
      return false; // Bloqueia o acesso à rota
    }
  }
}