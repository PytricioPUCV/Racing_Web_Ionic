import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonButton, IonSpinner, IonIcon } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../../components/header/header.component';
import { UserService, UserProfile } from '../../../services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.page.html',
  styleUrls: ['./admin-users.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeaderComponent,
    IonContent,
    IonButton,
    IonSpinner,
    IonIcon
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
      },
      error: (error) => {
        console.error('❌ Error al cargar usuarios:', error);
        this.loading = false;
      }
    });
  }

  viewUserProfile(userId: number) {
    this.router.navigate(['/profile'], { queryParams: { userId } });
  }
}
