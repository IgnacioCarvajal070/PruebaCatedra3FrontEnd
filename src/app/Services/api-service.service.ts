import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseAPI } from '../Interfaces/ResponseAPI';
import { firstValueFrom } from 'rxjs';
import { addPost, Post } from '../Interfaces/Post';

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
  async register (form: any): Promise<ResponseAPI>{
    try {
      this.errors = [];
      const response = await firstValueFrom(this.http.post<ResponseAPI>(`${this.baseUrl}/Auth/register`,form));
      return Promise.resolve(response);
    }
    catch (error: any){
      let e = error as HttpErrorResponse;
      this.errors.push(e.error);
      return Promise.reject(e.error);
    }
  }
  async getPosts(): Promise<Post[]>{
    try {
      this.errors = [];
      const response = await firstValueFrom(this.http.get<Post[]>(`${this.baseUrl}/Post`));
      return Promise.resolve(response);
    }
    catch (error: any){
      let e = error as HttpErrorResponse;
      this.errors.push(e.error);
      return Promise.reject(e.error);
    }
  }
  async createPost(form: any): Promise<addPost>{
    try {
      this.errors = [];
      const response = await firstValueFrom(this.http.post<addPost>(`${this.baseUrl}/Post`,form));
      return Promise.resolve(response);
    }
    catch (error: any){
      let e = error as HttpErrorResponse;
      this.errors.push(e.error);
      return Promise.reject(e.error);
    }
  }
}
