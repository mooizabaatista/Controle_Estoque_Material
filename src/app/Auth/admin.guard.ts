import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import Swal from 'sweetalert2'; // Importa o SweetAlert
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      return true; // Permite o acesso à rota
    } else {
      // Exibe o alerta de permissão negada
      Swal.fire({
        title: 'Atenção',
        text: "Você não tem permissão para acessar esta página.",
        icon: 'warning',
        confirmButtonText: 'Ok',
        customClass: {
          confirmButton: 'btn btn-danger',
        }
      });

      return false; // Bloqueia o acesso à rota
    }
  }
}