import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../../Services/local-storage.service';

@Component({
  selector: 'app-main',
  imports: [RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  private localStorageService = inject(LocalStorageService);
  constructor(private router: Router) {}

  navigateToPostList(){
    this.router.navigate(['/post-list']);
  }
  navigateToCreatePost(){
    this.router.navigate(['/create-post']);
  }
  logout() {
    this.localStorageService.removeValue('token');
    this.router.navigate(['']);
  }
}
