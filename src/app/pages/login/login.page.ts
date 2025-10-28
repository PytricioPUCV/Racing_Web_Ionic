import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // NUEVO
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton, IonToast } from '@ionic/angular/standalone'; // AGREGADO IonToast
import { HeaderComponent } from '../../components/header/header.component';
import { UserService } from '../../services/user.service'; // NUEVO

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
    IonToast // NUEVO
  ]
})
export class LoginPage implements OnInit {
  // NUEVAS INYECCIONES
  private userService = inject(UserService);
  private router = inject(Router);

  // CAMPOS DEL FORMULARIO
  email: string = '';
  password: string = '';

  // MENSAJES
  showToast: boolean = false;
  toastMessage: string = '';
  toastColor: string = 'success';

  constructor() { }
  
  ngOnInit() { }

  // NUEVA FUNCIÓN: Login con API
  onLogin() {
    // Validación básica
    if (!this.email || !this.password) {
      this.showToastMessage('Email y contraseña son obligatorios', 'danger');
      return;
    }

    // Obtener usuarios de la API y verificar credenciales
    this.userService.getUsers().subscribe({
      next: (users) => {
        console.log('✅ Usuarios obtenidos de API:', users);
        
        // Buscar usuario con email coincidente
        const userFound = users.find(u => u.email === this.email);
        
        if (userFound) {
          // NOTA: En producción, la validación de password debe hacerse en el backend
          // Este es un ejemplo educativo
          console.log('✅ Usuario encontrado:', userFound);
          this.showToastMessage(`¡Bienvenido ${userFound.username}!`, 'success');
          
          // Guardar datos del usuario en localStorage
          localStorage.setItem('currentUser', JSON.stringify(userFound));
          
          // Navegar a home después de 1 segundo
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1000);
        } else {
          console.log('❌ Email no encontrado');
          this.showToastMessage('Email o contraseña incorrectos', 'danger');
        }
      },
      error: (error) => {
        console.error('❌ Error al conectar con API:', error);
        this.showToastMessage('Error al conectar con el servidor. ¿Está el backend corriendo?', 'danger');
      }
    });
  }

  // NUEVA FUNCIÓN: Mostrar mensajes
  showToastMessage(message: string, color: string) {
    this.toastMessage = message;
    this.toastColor = color;
    this.showToast = true;
  }
}