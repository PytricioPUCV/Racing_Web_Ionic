import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonCard, 
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  IonToast,
  IonButtons,
  IonBackButton,
  IonSpinner
} from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../services/auth.service';
import { UserService, UserProfile } from '../../services/user.service';
import { addIcons } from 'ionicons';
import { personOutline, mailOutline, cardOutline, locationOutline, saveOutline, lockClosedOutline, lockOpenOutline } from 'ionicons/icons';
import { REGIONES_Y_COMUNAS } from '../../data/regiones';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon,
    IonToast,
    IonButtons,
    IonBackButton,
    IonSpinner
  ]
})
export class ProfilePage implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  currentUser: any = null;
  viewingUser: UserProfile | null = null;
  isAdmin: boolean = false;
  isViewingOtherUser: boolean = false;
  
  username: string = '';
  email: string = '';
  rut: string = '';
  selectedRegion: string = '';
  selectedComuna: string = '';
  currentPassword: string = '';
  newPassword: string = '';

  isEditing: boolean = false;
  loading: boolean = false;

  showToast: boolean = false;
  toastMessage: string = '';
  toastColor: string = 'success';

  regionesYComunas = REGIONES_Y_COMUNAS;

  regiones: string[] = [];
  comunas: string[] = [];

  constructor() {
    addIcons({ 
      personOutline, 
      mailOutline, 
      cardOutline, 
      locationOutline, 
      saveOutline,
      lockClosedOutline,
      lockOpenOutline
    });
  }

  ngOnInit() {
    this.regiones = Object.keys(this.regionesYComunas);
    this.currentUser = this.authService.getCurrentUser();
    this.isAdmin = this.currentUser?.role === 'admin';

    this.route.queryParams.subscribe(params => {
      if (this.isAdmin && params['userId']) {
        this.isViewingOtherUser = true;
        this.loadUserProfile(+params['userId']);
      } else {
        this.loadMyProfile();
      }
    });
  }

  loadMyProfile() {
    if (this.currentUser) {
      this.username = this.currentUser.username;
      this.email = this.currentUser.email;
      this.rut = this.currentUser.rut;
      this.selectedRegion = this.currentUser.region;
      this.selectedComuna = this.currentUser.comuna;
      this.viewingUser = this.currentUser;
      
      this.comunas = this.regionesYComunas[this.selectedRegion] || [];
    }
  }

  loadUserProfile(userId: number) {
    this.loading = true;
    
    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        this.viewingUser = user;
        this.username = user.username;
        this.email = user.email;
        this.rut = user.rut || '';
        this.selectedRegion = user.region || '';
        this.selectedComuna = user.comuna || '';
        
        this.comunas = this.regionesYComunas[this.selectedRegion] || [];
        this.loading = false;
        console.log('✅ Perfil de usuario cargado:', user);
      },
      error: (error) => {
        console.error('❌ Error al cargar perfil:', error);
        this.loading = false;
      }
    });
  }

  onRegionChange(event: any) {
    const regionSeleccionada = event.detail.value as string;
    this.selectedRegion = regionSeleccionada;
    this.comunas = this.regionesYComunas[regionSeleccionada] || [];
    this.selectedComuna = '';
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    
    if (!this.isEditing) {
      if (this.isViewingOtherUser && this.viewingUser) {
        this.loadUserProfile(this.viewingUser.id);
      } else {
        this.loadMyProfile();
      }
      this.currentPassword = '';
      this.newPassword = '';
    }
  }

  isValidUsername(username: string): boolean {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
  }

  isValidRut(rut: string): boolean {
    const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/;
    return rutRegex.test(rut);
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  }

  onSaveProfile() {
    if (!this.username || !this.email || !this.selectedRegion || !this.selectedComuna) {
      this.showToastMessage('Todos los campos son obligatorios', 'danger');
      return;
    }

    if (!this.isValidUsername(this.username)) {
      this.showToastMessage('El nombre de usuario debe tener entre 3 y 20 caracteres', 'danger');
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.showToastMessage('Email inválido. Ejemplo: usuario@ejemplo.com', 'danger');
      return;
    }

    if (!this.isValidRut(this.rut)) {
      this.showToastMessage('RUT inválido. Formato: 12.345.678-9', 'danger');
      return;
    }

    const wantsPasswordChange = !this.isViewingOtherUser && !!(this.currentPassword || this.newPassword);

    if (wantsPasswordChange) {
      if (!this.currentPassword || !this.newPassword) {
        this.showToastMessage('Para cambiar la contraseña ingresa la actual y la nueva', 'danger');
        return;
      }

      if (!this.isValidPassword(this.newPassword)) {
        this.showToastMessage('La nueva contraseña debe tener al menos 8 caracteres, incluyendo letras y números', 'danger');
        return;
      }
    }

    const updateData = {
      username: this.username,
      email: this.email,
      rut: this.rut,
      region: this.selectedRegion,
      comuna: this.selectedComuna
    };

    const userId = this.isViewingOtherUser && this.viewingUser ? this.viewingUser.id : this.currentUser.id;

    this.userService.updateUser(userId, updateData).subscribe({
      next: (user) => {
        if (!this.isViewingOtherUser) {
          const updatedUser = {
            ...this.currentUser,
            username: user.username,
            email: user.email,
            rut: user.rut,
            region: user.region,
            comuna: user.comuna
          };

          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          this.currentUser = updatedUser;
        }

        if (wantsPasswordChange) {
          this.changePassword(userId);
        } else {
          this.finishSave('Perfil actualizado exitosamente');
        }
      },
      error: (error) => {
        console.error('❌ Error al actualizar perfil:', error);
        this.showToastMessage(error.error?.message || 'Error al actualizar perfil', 'danger');
      }
    });
  }

  private changePassword(userId: number) {
    this.userService.changePassword(userId, this.currentPassword, this.newPassword).subscribe({
      next: () => this.finishSave('Perfil y contraseña actualizados exitosamente'),
      error: (error) => {
        // El perfil ya se guardó: se mantiene el modo edición para reintentar la contraseña
        const reason = error.error?.message || 'Error al cambiar la contraseña';
        this.showToastMessage(`Perfil guardado, pero no se cambió la contraseña: ${reason}`, 'danger');
      }
    });
  }

  private finishSave(message: string) {
    this.isEditing = false;
    this.currentPassword = '';
    this.newPassword = '';
    this.showToastMessage(message, 'success');
  }

  deleteUser() {
    if (!this.viewingUser || !this.isViewingOtherUser) return;

    if (!confirm(`¿Estás seguro de que deseas eliminar a ${this.viewingUser.username}?`)) {
      return;
    }

    this.userService.deleteUser(this.viewingUser.id).subscribe({
      next: () => {
        this.showToastMessage('Usuario eliminado exitosamente', 'success');
        setTimeout(() => {
          this.router.navigate(['/admin/users']);
        }, 1500);
      },
      error: (error) => {
        console.error('❌ Error al eliminar usuario:', error);
        this.showToastMessage('Error al eliminar usuario', 'danger');
      }
    });
  }

  showToastMessage(message: string, color: string) {
    this.toastMessage = message;
    this.toastColor = color;
    this.showToast = true;
  }
}
