import { Component } from '@angular/core';
import { Post } from '../../Interfaces/Post';
import { ApiServiceService } from '../../Services/api-service.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent {
    form!: FormGroup;
    file: File | null = null;
    constructor(private apiService: ApiServiceService,private fb: FormBuilder, private http: HttpClient) {
        this.formulario();
    }
    formulario(){
    this.form = this.fb.group({
        title: ['',[Validators.required]],
        image: ['',[Validators.required]]
      });
    }
    get titleValidate(){
      return this.form.get('title')?.invalid && this.form.get('title')?.touched;
    }
    get imageValidate(){
      return this.form.get('image')?.invalid && this.form.get('image')?.touched;
    }
    
    async createPost() {
      if (this.form.invalid){
        return Object.values(this.form.controls).forEach(control => {
          control.markAsTouched();
          });
      }
      try {
        const formData = new FormData();
        formData.append('title', this.form.get('title')?.value);
        formData.append('image', this.file as Blob);
        const response = await this.apiService.createPost(formData);
        console.log(response);
        }
        catch (error: any){
          console.log(error);
        }
      }
    onFileSelected(event: any){
      const file = event.target.files[0];
      if (file){
        this.file = file;
      }
    }
  }
