import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { ResponseData } from '../interfaces/response-data';

@Injectable({
  providedIn: 'root'
})

export class MovimentacaoService {

  isDevelop: boolean = true;
  urlBase: String = '';


  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.urlBase = 'https://controle-estoque-api.azurewebsites.net/api/v1';
  }

  getAll(): Observable<ResponseData> {
    return this.httpClient.get<ResponseData>(`${this.urlBase}/Movimentacoes`);
  }

  getById(id: number): Observable<ResponseData> {
    return this.httpClient.get<ResponseData>(`${this.urlBase}/Movimentacoes/${id}`);
  }

  add(data: any): Observable<ResponseData> {
    return this.httpClient.post<ResponseData>(`${this.urlBase}/Movimentacoes`, data);
  }

  edit(id: number, data: any): Observable<ResponseData> {
    return this.httpClient.put<ResponseData>(`${this.urlBase}/Movimentacoes/${id}`, data);
  }

  remove(id: number): Observable<ResponseData> {
    return this.httpClient.delete<ResponseData>(`${this.urlBase}/Movimentacoes/${id}`);
  }

  getDadosPDF(dataInicio: string, dataFinal: string): Observable<any> {
    return this.httpClient.get<any>(`${this.urlBase}/Movimentacoes/GetDadosPDF/${dataInicio}/${dataFinal}`);
  }

  getTopCinco(): Observable<any> {
    return this.httpClient.get<any>(`${this.urlBase}/Movimentacoes/GetTopCinco`);
  }
}
