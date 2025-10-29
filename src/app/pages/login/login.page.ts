import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton, IonToast } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    HeaderComponent, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonList, 
    IonItem, 
    IonInput, 
    IonButton,
    IonToast
  ]
})
export class LoginPage implements OnInit {
  private authService = inject(AuthService);

  email: string = '';
  password: string = '';

  showToast: boolean = false;
  toastMessage: string = '';
  toastColor: string = 'success';

  constructor() { }
  
  ngOnInit() { }

  // ============================================
  // FUNCIÓN DE VALIDACIÓN
  // ============================================
  
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // ============================================
  // FUNCIÓN DE LOGIN MEJORADA CON VALIDACIONES
  // ============================================

  onLogin() {
    // 1. Validar campos requeridos
    if (!this.email || !this.password) {
      this.showToastMessage('Email y contraseña son obligatorios', 'danger');
      return;
    }

    // 2. Validar formato de email
    if (!this.isValidEmail(this.email)) {
      this.showToastMessage('Email inválido', 'danger');
      return;
    }

    // 3. Preparar credenciales
    const credentials = {
      email: this.email,
      password: this.password
    };

    // 4. Realizar login con AuthService
    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('✅ Login exitoso con JWT:', response);
        console.log('✅ Token guardado:', response.token);
        console.log('✅ Usuario:', response.user);
        
        this.showToastMessage(`¡Bienvenido ${response.user.username}!`, 'success');
        
        setTimeout(() => {
          window.location.href = '/home';
        }, 1500);
      },
      error: (error) => {
        console.error('❌ Error al hacer login:', error);
        let errorMsg = 'Email o contraseña incorrectos';
        
        // Mostrar mensaje del backend si existe
        if (error.error?.message) {
          errorMsg = error.error.message;
        }
        
        this.showToastMessage(errorMsg, 'danger');
      }
    });
  }

  showToastMessage(message: string, color: string) {
    this.toastMessage = message;
    this.toastColor = color;
    this.showToast = true;
  }
}
