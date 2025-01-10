import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../../Services/local-storage.service';

@Component({
  selector: 'app-upper-bar-main',
  imports: [RouterModule],
  templateUrl: './upper-bar-main.component.html',
  styleUrl: './upper-bar-main.component.css'
})
export class UpperBarMainComponent {
  constructor(private router: Router, private localStorage: LocalStorageService) { }
  navegateToCreate(){
    this.router.navigate(['/create-post']);
  }
  logout() {
    this.localStorage.removeValue('token');
    this.router.navigate(['']);
  }
}
