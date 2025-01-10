import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-upperbar-post-create',
  imports: [RouterModule],
  templateUrl: './upperbar-post-create.component.html',
  styleUrl: './upperbar-post-create.component.css'
})
export class UpperbarPostCreateComponent {
  constructor(private router: Router) {
  }
  navigateToPostList(){
    this.router.navigate(['/post-list']);
  }
}
