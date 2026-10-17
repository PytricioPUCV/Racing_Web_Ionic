import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonInput, IonSelect, IonSelectOption, IonCheckbox, IonButton, IonSpinner, ToastController } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../services/auth.service';
import { REGIONES_Y_COMUNAS } from '../../data/regiones';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    HeaderComponent,
    IonContent,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonCheckbox,
    IonButton,
    IonSpinner
  ]
})
export class RegisterPage implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastController = inject(ToastController);

  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  username: string = '';
  rut: string = '';
  selectedRegion: string = '';
  selectedComuna: string = '';
  acceptTerms = false;
  submitting = false;

  regionesYComunas = REGIONES_Y_COMUNAS;

  regiones: string[] = [];
  comunas: string[] = [];

  constructor() { }

  ngOnInit() {
    this.regiones = Object.keys(this.regionesYComunas);
  }

  onRegionChange(event: any) {
    const regionSeleccionada = event.detail.value as string;
    this.selectedRegion = regionSeleccionada;
    this.comunas = this.regionesYComunas[regionSeleccionada] || [];
    this.selectedComuna = '';
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  }

  isValidRut(rut: string): boolean {
    const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/;
    return rutRegex.test(rut);
  }

  isValidUsername(username: string): boolean {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
  }

  onRegister() {
    if (this.submitting) return;

    if (!this.email || !this.password || !this.username || !this.rut || !this.selectedRegion || !this.selectedComuna) {
      this.showToastMessage('Todos los campos son obligatorios', 'danger');
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.showToastMessage('Email inválido. Ejemplo: usuario@ejemplo.com', 'danger');
      return;
    }

    if (!this.isValidPassword(this.password)) {
      this.showToastMessage('La contraseña debe tener al menos 8 caracteres, incluyendo letras y números', 'danger');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.showToastMessage('Las contraseñas no coinciden', 'danger');
      return;
    }

    if (!this.isValidUsername(this.username)) {
      this.showToastMessage('El nombre de usuario debe tener entre 3 y 20 caracteres (solo letras, números y guiones bajos)', 'danger');
      return;
    }

    if (!this.isValidRut(this.rut)) {
      this.showToastMessage('RUT inválido. Formato: 12.345.678-9', 'danger');
      return;
    }

    if (!this.acceptTerms) {
      this.showToastMessage('Debes aceptar los términos y condiciones para crear tu cuenta', 'danger');
      return;
    }

    const registerData = {
      email: this.email,
      password: this.password,
      username: this.username,
      rut: this.rut,
      region: this.selectedRegion,
      comuna: this.selectedComuna
    };

    this.submitting = true;

    this.authService.register(registerData).subscribe({
      next: (response) => {
        this.submitting = false;
        this.showToastMessage(`Cuenta creada. ¡Bienvenido, ${response.user.username}!`, 'success');
        this.clearForm();
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        this.submitting = false;
        this.showToastMessage(error.error?.message || 'No se pudo crear la cuenta', 'danger');
      }
    });
  }

  async showToastMessage(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 3000,
      position: 'top',
      cssClass: 'custom-toast'
    });
    await toast.present();
  }

  clearForm() {
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.username = '';
    this.rut = '';
    this.selectedRegion = '';
    this.selectedComuna = '';
    this.comunas = [];
    this.acceptTerms = false;
  }
}
