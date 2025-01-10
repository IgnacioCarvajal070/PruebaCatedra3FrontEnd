import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../../Services/local-storage.service';

@Component({
  selector: 'app-upper-bar-main',
  imports: [RouterModule],
  templateUrl: './upper-bar-main.component.html',
  styleUrl: './upper-bar-main.component.css'
})
/**
 * Componente de la barra superior de la aplicación, utilizada en la página principal(page-list)
 */
export class UpperBarMainComponent {
  /**
   * Constructor de la clase
   * @param router Router de la aplicación
   * @param localStorage Servicio de almacenamiento local
   */
  constructor(private router: Router, private localStorage: LocalStorageService) { }
  /**
   * Navega a la página de creación de posts
   */
  navegateToCreate(){
    this.router.navigate(['/create-post']);
  }
  /**
   * Metodo para cerrar sesión
   */
  logout() {
    this.localStorage.removeValue('token');
    this.router.navigate(['']);
  }
}
