import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseAPI } from '../Interfaces/ResponseAPI';
import { firstValueFrom } from 'rxjs';
import { addPost, Post } from '../Interfaces/Post';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio de la API
 */
export class ApiServiceService {
  /**
   * URL base de la API
   */
  private baseUrl = 'http://localhost:5021/api';
  /**
   * Lista de errores
   */
  public errors: string[] = [];
  /**
   * Constructor de la clase
   * @param http Cliente HTTP
   */
  constructor(private http: HttpClient) { }

  /**
   * Inicia sesión
   * @param form Formulario de inicio de sesión
   * @returns Respuesta de la API
   */
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
  /**
   * Registra un usuario
   * @param form Formulario de registro
   * @returns Respuesta de la API
   */
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
  /**
   * Obtiene los posts
   * @returns Lista de posts
   */
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
  /**
   * Crea un post
   * @param form Formulario de creación de post
   * @returns Respuesta de la API
   */
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
