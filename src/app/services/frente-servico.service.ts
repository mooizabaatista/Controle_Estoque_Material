import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseData } from '../interfaces/response-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrenteServicoService {

  urlBase: String = '';


  constructor(private httpClient: HttpClient) {
    this.urlBase = 'https://controle-estoque-api.azurewebsites.net/api/v1';
  }

  getAll(): Observable<ResponseData> {
    return this.httpClient.get<ResponseData>(`${this.urlBase}/FrenteServicos`);
  }

  getAllNotInEstoque(): Observable<ResponseData> {
    return this.httpClient.get<ResponseData>(`${this.urlBase}/FrenteServicos/GetNotInEstoque`);
  }

  getById(id: number): Observable<ResponseData> {
    return this.httpClient.get<ResponseData>(`${this.urlBase}/FrenteServicos/${id}`);
  }

  add(data: any): Observable<ResponseData> {
    return this.httpClient.post<ResponseData>(`${this.urlBase}/FrenteServicos`, data);
  }

  edit(id: number, data: any): Observable<ResponseData> {
    return this.httpClient.put<ResponseData>(`${this.urlBase}/FrenteServicos/${id}`, data);
  }

  remove(id: number): Observable<ResponseData> {
    return this.httpClient.delete<ResponseData>(`${this.urlBase}/FrenteServicos/${id}`);
  }
}
