import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-upperbar-post-create',
  imports: [RouterModule],
  templateUrl: './upperbar-post-create.component.html',
  styleUrl: './upperbar-post-create.component.css'
})
/**
 * Componente de la barra superior de la aplicación, utilizada en la creación de posts
 */
export class UpperbarPostCreateComponent {
  /**
   * Constructor de la clase
   * @param router Router de la aplicación
   */
  constructor(private router: Router) {
  }
  /**
   * Navega a la lista de posts
   */
  navigateToPostList(){
    this.router.navigate(['/post-list']);
  }
}
