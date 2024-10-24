import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseData } from '../interfaces/response-data';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  urlBase: String = '';


  constructor(private httpClient: HttpClient) {
    this.urlBase = 'https://localhost:7000/api/v1';
  }

  getAll(): Observable<ResponseData> {
    return this.httpClient.get<ResponseData>(`${this.urlBase}/Produtos`);
  }

  getAllNotInEstoque(): Observable<ResponseData> {
    return this.httpClient.get<ResponseData>(`${this.urlBase}/Produtos/GetNotInEstoque`);
  }

  getById(id: number): Observable<ResponseData> {
    return this.httpClient.get<ResponseData>(`${this.urlBase}/Produtos/${id}`);
  }

  add(data: any): Observable<ResponseData> {
    return this.httpClient.post<ResponseData>(`${this.urlBase}/Produtos`, data);
  }

  edit(id: number, data: any): Observable<ResponseData> {
    return this.httpClient.put<ResponseData>(`${this.urlBase}/Produtos/${id}`, data);
  }

  remove(id: number): Observable<ResponseData> {
    return this.httpClient.delete<ResponseData>(`${this.urlBase}/Produtos/${id}`);
  }
}
