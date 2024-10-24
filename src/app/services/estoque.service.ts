import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ResponseData } from '../interfaces/response-data';

@Injectable({
  providedIn: 'root'
})

export class EstoqueService {

  isDevelop: boolean = true;
  urlBase: String = '';


  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.urlBase = 'https://controle-estoque-api.azurewebsites.net/api/v1';
  }




  getAll(): Observable<ResponseData> {
    return this.httpClient.get<ResponseData>(`${this.urlBase}/Estoques`);
  }

  getProductsInEstoque(): Observable<ResponseData> {
    return this.httpClient.get<ResponseData>(`${this.urlBase}/Estoques/GetAllInEstoque`)
  }

  getById(id: number): Observable<ResponseData> {
    return this.httpClient.get<ResponseData>(`${this.urlBase}/Estoques/${id}`);
  }

  add(data: any): Observable<ResponseData> {

    const token = localStorage.getItem('token_app')
    return this.httpClient.post<ResponseData>(`${this.urlBase}/Estoques`, data);
  }

  edit(id: number, data: any): Observable<ResponseData> {
    return this.httpClient.put<ResponseData>(`${this.urlBase}/Estoques/${id}`, data);
  }

  remove(id: number): Observable<ResponseData> {
    return this.httpClient.delete<ResponseData>(`${this.urlBase}/Estoques/${id}`);
  }
}
