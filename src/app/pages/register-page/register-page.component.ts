import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServiceService } from '../../Services/api-service.service';
import { LocalStorageService } from '../../Services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  form!: FormGroup;
  registerAlert: boolean = false;
  error: boolean = false;
  errorMessage: string[] = [];
  private authService = inject(ApiServiceService);
  private LocalStorageService = inject(LocalStorageService);
  constructor(private fb: FormBuilder, private router: Router) {
    this.formulario();
  }
  formulario(){
    this.form = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      name: ['',[Validators.required]],
      password: ['',[Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*\d).*$/)]],
      confirmPassword: ['',[Validators.required]]
    });
  }
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      group.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      group.get('confirmPassword')?.setErrors(null);
    }
  }
  get emailValidate(){
    return this.form.get('email')?.invalid && this.form.get('email')?.touched;
  }
  get nameValidate(){
    return this.form.get('name')?.invalid && this.form.get('name')?.touched;
  }
  get passwordValidate(){
    const passwordControl = this.form.get('password');
    return passwordControl?.hasError('required') && passwordControl?.touched ? 'La contraseña es requerida.' :
            passwordControl?.hasError('minlength') ? 'La contraseña debe tener al menos 6 caracteres.' :
            passwordControl?.hasError('pattern') ? 'La contraseña debe contener al menos un número.' : null;
  }
  get passwordConfirmationValidate(){
    return this.form.get('confirmPassword')?.invalid && this.form.get('password_confirmation')?.touched;
  }
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
        this.router.navigate(['/main']);
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
