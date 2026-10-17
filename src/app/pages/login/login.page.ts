import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonInput, IonButton, IonSpinner, ToastController } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HeaderComponent, IonContent, IonInput, IonButton, IonSpinner]
})
export class LoginPage {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastController = inject(ToastController);

  email: string = '';
  password: string = '';
  submitting = false;

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  onLogin() {
    if (this.submitting) return;

    if (!this.email || !this.password) {
      this.showToastMessage('Ingresa tu email y tu contraseña', 'danger');
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.showToastMessage('El email no es válido. Ejemplo: usuario@ejemplo.com', 'danger');
      return;
    }

    this.submitting = true;

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        this.submitting = false;
        this.password = '';
        this.showToastMessage(`¡Hola, ${response.user.username}!`, 'success');
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        this.submitting = false;
        this.showToastMessage(error.error?.message || 'Email o contraseña incorrectos', 'danger');
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
}
