import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response';
import { LoginCommand } from '../interfaces/login-command';
import { RegisterCommand } from '../interfaces/register-command';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  baseUrl: string = "https://controle-estoque-auth-api.azurewebsites.net/api/auth/";

  login(login: LoginCommand): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.baseUrl + 'login', login);
  }

  register(register: RegisterCommand): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.baseUrl + 'register', register);
  }

  decodeJwt(token: string): any {
    const base64Url = token.split('.')[1]; 
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(escape(window.atob(base64))); 

    return JSON.parse(jsonPayload); 
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('token_app')

    if (token) {
      const decodedToken = this.decodeJwt(token)

      if ((decodedToken.role as string).toLowerCase() === 'admin') {
        return true
      }
    }

    return false;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token_app')

    if (token) {
      const decodedToken = this.decodeJwt(token)
      return true;
    }

    return false;
  }
}
