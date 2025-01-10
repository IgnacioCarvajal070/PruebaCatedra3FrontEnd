import { Component } from '@angular/core';
import { Post } from '../../Interfaces/Post';
import { ApiServiceService } from '../../Services/api-service.service';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  imports: [DatePipe, CommonModule, ReactiveFormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent {
  
  }

