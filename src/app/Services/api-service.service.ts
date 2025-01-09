import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseAPI } from '../Interfaces/ResponseAPI';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private baseUrl = 'http://localhost:5021/api';
  public errors: string[] = [];
  constructor(private http: HttpClient) { }

  async login (form: any): Promise<ResponseAPI>{
    try {
      this.errors = [];
      const response = await firstValueFrom(this.http.post<ResponseAPI>(`${this.baseUrl}/Auth/login`,form));
      return Promise.resolve(response);
    }
    catch (error: any){
      let e = error as HttpErrorResponse;
      this.errors.push(e.error);
      return Promise.reject(e.error);
    }
  }
}
