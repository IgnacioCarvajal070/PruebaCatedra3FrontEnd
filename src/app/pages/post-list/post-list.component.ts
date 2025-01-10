import { Component } from '@angular/core';
import { Post } from '../../Interfaces/Post';
import { ApiServiceService } from '../../Services/api-service.service';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UpperBarMainComponent } from "../../Components/upper-bar-main/upper-bar-main.component";

@Component({
  selector: 'app-post-list',
  imports: [CommonModule, ReactiveFormsModule, DatePipe, UpperBarMainComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
/**
 * Componente de la lista de posts
 */
export class PostListComponent {
  /**
   * Lista de posts
   */
  posts: Post[] = [];

  /**
   * Constructor de la clase
   * @param apiService Servicio de la API
   */
  constructor(private apiService: ApiServiceService) {
    this.getPosts();
  }
  /**
   * Obtiene los posts
   */
  async getPosts(){
    this.apiService.getPosts().then(response => {
      if (response.length > 0){
        this.posts = response;
      }
      else {
        console.log('No hay posts');
      }
    }).catch(error => {
      console.log(error);
    });
  }
}
