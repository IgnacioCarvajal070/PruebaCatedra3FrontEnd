import { Component } from '@angular/core';
import { Post } from '../../Interfaces/Post';
import { ApiServiceService } from '../../Services/api-service.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { UpperbarPostCreateComponent } from "../../Components/upperbar-post-create/upperbar-post-create.component";
@Component({
  selector: 'app-post-create',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, UpperbarPostCreateComponent],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
/**
 * Componente de la creación de posts
 */
export class PostCreateComponent {
    /**
    * Formulario de creación de posts
    */
    form!: FormGroup;
    /**
     * Auxiliar para evitar la creación de multiples posts
     */
    auxPost: number = 0;
    /**
     * Archivo de la imagen del post
     */
    file: File | null = null;
    /**
     * Constructor de la clase
     * @param apiService Servicio para la API
     * @param fb FormBuilder para el formulario
     * @param http Cliente HTTP
     * @param router Router de la aplicación
     */
    constructor(private apiService: ApiServiceService,private fb: FormBuilder, private http: HttpClient, private router: Router) {
        this.formulario();
    }
    /**
     * Inicializa el formulario
     */
    formulario(){
    this.form = this.fb.group({
        title: ['',[Validators.required]],
        image: ['',[Validators.required]]
      });
    }
    /**
     * Metodo validador del campo titulo
     */
    get titleValidate(){
      return this.form.get('title')?.invalid && this.form.get('title')?.touched;
    }
    /**
     * Metodo validador del campo imagen
     */
    get imageValidate(){
      return this.form.get('image')?.invalid && this.form.get('image')?.touched;
    }
    /**
     * Metodo para crear un post
     * @returns
     */
    async createPost() {
      if (this.form.invalid){
        return Object.values(this.form.controls).forEach(control => {
          control.markAsTouched();
          });
      }
      try {
        if (this.auxPost == 0){
        this.auxPost = 1;
        const formData = new FormData();
        formData.append('title', this.form.get('title')?.value);
        formData.append('image', this.file as Blob);
        
        const response = await this.apiService.createPost(formData);
          this.navigateToPostList();
        }
        else {
          return;
        }
        }
        catch (error: any){
          console.log(error);
        }
      }
    /**
     * Metodo para seleccionar un archivo
     * @param event Evento de seleccion de archivo
     */
    onFileSelected(event: any){
      const file = event.target.files[0];
      if (file){
        this.file = file;
      }
    }
    /**
     * Metodo para navegar a la lista de posts
     */
    navigateToPostList(){
      this.router.navigate(['post-list']);
    }
  }
