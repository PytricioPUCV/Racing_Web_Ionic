import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton, IonToast } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';
import { UserService } from '../../services/user.service';

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
  private userService = inject(UserService);

  email: string = '';
  password: string = '';

  showToast: boolean = false;
  toastMessage: string = '';
  toastColor: string = 'success';

  constructor() { }
  
  ngOnInit() { }

  onLogin() {
    if (!this.email || !this.password) {
      this.showToastMessage('Email y contraseña son obligatorios', 'danger');
      return;
    }

    this.userService.getUsers().subscribe({
      next: (users) => {
        console.log('✅ Usuarios obtenidos de API:', users);
        
        const userFound = users.find(u => u.email === this.email);
        
        if (userFound) {
          console.log('✅ Usuario encontrado:', userFound);
          this.showToastMessage(`¡Bienvenido ${userFound.username}!`, 'success');
          
          localStorage.setItem('currentUser', JSON.stringify(userFound));
          
          // CAMBIO: Usar window.location.href para forzar navegación
          setTimeout(() => {
            window.location.href = '/home';
          }, 1500);
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

  showToastMessage(message: string, color: string) {
    this.toastMessage = message;
    this.toastColor = color;
    this.showToast = true;
  }
}
