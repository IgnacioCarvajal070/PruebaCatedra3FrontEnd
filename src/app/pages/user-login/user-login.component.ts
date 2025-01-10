import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServiceService } from '../../Services/api-service.service';
import { LocalStorageService } from '../../Services/local-storage.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UpperBarComponent } from "../../Components/upper-bar/upper-bar.component";
@Component({
  selector: 'app-user-login',
  imports: [ReactiveFormsModule, RouterModule, CommonModule, UpperBarComponent],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
/**
 * Componente de la página de inicio de sesión
 */
export class UserLoginComponent {
  /**
   * Formulario de inicio de sesión
   */
  form!: FormGroup;
  /**
   * Auxiliar para mostrar alerta de inicio de sesión
   */
  loginAlert: boolean = false;
  /**
   * Auxiliar para mostrar alerta de error
   */
  error: boolean = false;
  /**
   * Mensaje de error
   */
  errorMessage: string = '';
  /**
   * Correo electrónico
   */
  email: string = '';
  /**
   * Contraseña
   */
  password: string = '';
  /**
   * Servicio de autenticación
   */
  private authService = inject(ApiServiceService);
  /**
   * Servicio de almacenamiento local
   */
  private localStorageService = inject(LocalStorageService);

  /**
   * Constructor de la clase
   * @param fb FormBuilder para el formulario
   * @param router Router de la aplicación
   */
  constructor(private fb: FormBuilder, private router: Router) {
    this.formulario();
  }
  /**
   * Inicializa el formulario
   */
  formulario(){
    this.form = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',Validators.required]
    });
  }
  /**
   * Metodo validador del campo correo electrónico
   */
  get emailValidate(){
    return this.form.get('email')?.invalid && this.form.get('email')?.touched;
  }
  /**
   * Metodo validador del campo contraseña
   */
  get passwordValidate(){
    return this.form.get('password')?.invalid && this.form.get('password')?.touched;
  }

  /**
   * Metodo para iniciar sesión
   *
   */
  async login() {
    if (this.form.invalid){
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    try {
      const response = await this.authService.login(this.form.value);
      if (response.token){
        this.localStorageService.setVariable('token', response.token);
        this.localStorageService.setVariable('user', response.user);
        this.localStorageService.setLoggedIn(true);
        this.router.navigate(['/post-list']);
      }
      else {
        this.error = true;
        this.errorMessage = "Error al iniciar sesión";
      }
    } catch (error: any) {
      this.error = true;
      this.errorMessage = error.message;
    }
  }
  navigateToRegister(){
    this.router.navigate(['/register']);
  }
}
