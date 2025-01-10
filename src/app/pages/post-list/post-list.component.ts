import { Component } from '@angular/core';
import { Post } from '../../Interfaces/Post';
import { ApiServiceService } from '../../Services/api-service.service';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-list',
  imports: [CommonModule,ReactiveFormsModule,DatePipe],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {
  posts: Post[] = [];

  constructor(private apiService: ApiServiceService) {
    this.getPosts();
  }
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
