import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServiceService } from '../../Services/api-service.service';
import { LocalStorageService } from '../../Services/local-storage.service';
import { Router } from '@angular/router';
import { UpperBarRegisterComponent } from "../../Components/upper-bar-register/upper-bar-register.component";

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule,UpperBarRegisterComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
/**
 * Componente de la página de registro
 */
export class RegisterPageComponent {
  /**
   * Formulario de registro
   */
  form!: FormGroup;
  /**
   * Auxiliar para mostrar alerta de registro
   */
  registerAlert: boolean = false;
  /**
   * Auxiliar para mostrar alerta de error
   */
  error: boolean = false;
  /**
   * Mensaje de error
   */
  errorMessage: string[] = [];
  /**
   * Servicio de autenticación
   */
  private authService = inject(ApiServiceService);
  /**
   * Servicio de almacenamiento local
   */
  private LocalStorageService = inject(LocalStorageService);
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
      name: ['',[Validators.required]],
      password: ['',[Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*\d).*$/)]],
      confirmPassword: ['',[Validators.required]]
    }, { validators: this.passwordMatchValidator }
  );
  }
  /**
   * Metodo para validar que las contraseñas coincidan
   * @param group Grupo de campos del formulario
   */
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      group.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      group.get('confirmPassword')?.setErrors(null);
    }
  }
  /**
   * Metodo validador del campo email
   */
  get emailValidate(){
    return this.form.get('email')?.invalid && this.form.get('email')?.touched;
  }
  /**
   * Metodo validador del campo nombre
   */
  get nameValidate(){
    return this.form.get('name')?.invalid && this.form.get('name')?.touched;
  }
  /**
   * Metodo validador del campo contraseña
   */
  get passwordValidate(){  
    return this.form.get('password')?.hasError('required') && this.form.get('password')?.touched;
  }
  /**
   * Metodo validador del tamaño del campo contraseña
   */
  get passwordminLengthValidate(){
    return this.form.get('password')?.hasError('minlength') && this.form.get('password')?.touched;
  }
  /**
   * Metodo validador del patron del campo contraseña
   */
  get passwordPatternValidate(){
    return this.form.get('password')?.hasError('pattern') && this.form.get('password')?.touched;
  }
  /**
   * Metodo validador de la coincidencia entre contraseñas
   */
  get passwordMatchValidate(){
    return this.form.get('confirmPassword')?.hasError('mismatch') && this.form.get('confirmPassword')?.touched;
  }
  /**
   * Metodo para registrar un usuario
   * @returns 
   */
  async register() {
    if (this.form.invalid){
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    try {
      const response = await this.authService.register(this.form.value);
      if (response.token){
        this.LocalStorageService.setVariable('token', response.token);
        this.LocalStorageService.setVariable('user', response.user);
        this.LocalStorageService.setLoggedIn(true);
        this.router.navigate(['/post-list']);
      }
      else {
        this.error = true;
        this.errorMessage = ["Error al registrar"];
      }
    } catch (error: any) {
      this.error = true;
      console.log(error);
      this.errorMessage = error.message;
    }
  }
}
