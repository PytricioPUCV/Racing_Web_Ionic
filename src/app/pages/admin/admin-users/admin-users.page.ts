import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent, IonButton, IonCard, IonGrid, IonRow, IonCol, IonSpinner, IonBadge, IonCardHeader, IonCardContent } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../../components/header/header.component';
import { UserService, UserProfile } from '../../../services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.page.html',
  styleUrls: ['./admin-users.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    IonContent,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonSpinner,
    IonBadge
  ]
})
export class AdminUsersPage implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);

  users: UserProfile[] = [];
  loading: boolean = true;

  ngOnInit() {
    this.loadAllUsers();
  }

  loadAllUsers() {
    this.loading = true;

    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
        console.log('✅ Todos los usuarios cargados:', this.users);
      },
      error: (error) => {
        console.error('❌ Error al cargar usuarios:', error);
        this.loading = false;
      }
    });
  }

  // ✅ Ver perfil del usuario
  viewUserProfile(userId: number) {
    this.router.navigate(['/profile'], { queryParams: { userId } });
  }
}
