import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  IonBackButton
} from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { personOutline, mailOutline, cardOutline, locationOutline, saveOutline, lockClosedOutline, lockOpenOutline } from 'ionicons/icons';

type RegionKey = keyof typeof ProfilePage.prototype.regionesYComunas;

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
    IonBackButton
  ]
})
export class ProfilePage implements OnInit {
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private router = inject(Router);

  // Usuario actual
  currentUser: any = null;
  
  // Campos editables
  username: string = '';
  rut: string = '';
  selectedRegion: string = '';
  selectedComuna: string = '';
  currentPassword: string = '';
  newPassword: string = '';

  // Modo edición
  isEditing: boolean = false;

  // Toast
  showToast: boolean = false;
  toastMessage: string = '';
  toastColor: string = 'success';

  // Regiones y comunas
  regionesYComunas = {
    "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
    "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
    "Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
    "Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
    "Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
    "Valparaíso": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"],
    "Metropolitana de Santiago": ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"],
    "Libertador General Bernardo O'Higgins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
    "Maule": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
    "Ñuble": ["Chillán", "Bulnes", "Chillán Viejo", "El Carmen", "Pemuco", "Pinto", "Quillón", "San Ignacio", "Yungay", "Quirihue", "Cobquecura", "Coelemu", "Ninhue", "Portezuelo", "Ránquil", "Treguaco", "San Carlos", "Coihueco", "Ñiquén", "San Fabián", "San Nicolás"],
    "Biobío": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"],
    "La Araucanía": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
    "Los Ríos": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"],
    "Los Lagos": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"],
    "Aysén del General Carlos Ibáñez del Campo": ["Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
    "Magallanes y de la Antártica Chilena": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos (Ex Navarino)", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
  };

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
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.currentUser = this.authService.getCurrentUser();
    
    if (this.currentUser) {
      this.username = this.currentUser.username;
      this.rut = this.currentUser.rut;
      this.selectedRegion = this.currentUser.region;
      this.selectedComuna = this.currentUser.comuna;
      
      // Cargar comunas de la región actual
      this.comunas = this.regionesYComunas[this.selectedRegion as RegionKey] || [];
    }
  }

  onRegionChange(event: any) {
    const regionSeleccionada = event.detail.value as RegionKey;
    this.selectedRegion = regionSeleccionada;
    this.comunas = this.regionesYComunas[regionSeleccionada] || [];
    this.selectedComuna = ''; // Resetear comuna al cambiar región
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    
    if (!this.isEditing) {
      // Si cancela, restaurar valores originales y limpiar contraseñas
      this.loadUserProfile();
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

  onSaveProfile() {
    // Validaciones
    if (!this.username || !this.rut || !this.selectedRegion || !this.selectedComuna) {
      this.showToastMessage('Todos los campos son obligatorios', 'danger');
      return;
    }

    if (!this.isValidUsername(this.username)) {
      this.showToastMessage('El nombre de usuario debe tener entre 3 y 20 caracteres', 'danger');
      return;
    }

    if (!this.isValidRut(this.rut)) {
      this.showToastMessage('RUT inválido. Formato: 12.345.678-9', 'danger');
      return;
    }

    // Validar contraseñas si se ingresaron
    if (this.currentPassword || this.newPassword) {
      if (!this.currentPassword || !this.newPassword) {
        this.showToastMessage('Debe ingresar ambas contraseñas para cambiarla', 'danger');
        return;
      }
      
      if (this.newPassword.length < 6) {
        this.showToastMessage('La nueva contraseña debe tener al menos 6 caracteres', 'danger');
        return;
      }
    }

    const updateData = {
      username: this.username,
      email: this.currentUser.email,
      rut: this.rut,
      region: this.selectedRegion,
      comuna: this.selectedComuna
    };

    const apiUrl = `http://localhost:3000/api/users/${this.currentUser.id}`;

    this.http.put(apiUrl, updateData).subscribe({
      next: (response: any) => {
        console.log('✅ Perfil actualizado:', response);
        
        // Actualizar usuario en localStorage
        const updatedUser = {
          ...this.currentUser,
          username: response.user.username,
          email: response.user.email,
          rut: response.user.rut,
          region: response.user.region,
          comuna: response.user.comuna
        };
        
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        this.currentUser = updatedUser;

        // Si hay contraseñas, cambiar contraseña
        if (this.currentPassword && this.newPassword) {
          this.changePassword();
        } else {
          this.isEditing = false;
          this.showToastMessage('Perfil actualizado exitosamente', 'success');
        }
      },
      error: (error) => {
        console.error('❌ Error al actualizar perfil:', error);
        let errorMsg = 'Error al actualizar perfil';
        
        if (error.error?.message) {
          errorMsg = error.error.message;
        }
        
        this.showToastMessage(errorMsg, 'danger');
      }
    });
  }

  changePassword() {
    const passwordData = {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    };

    const apiUrl = `http://localhost:3000/api/users/${this.currentUser.id}/change-password`;

    this.http.put(apiUrl, passwordData).subscribe({
      next: (response: any) => {
        console.log('✅ Contraseña actualizada:', response);
        this.currentPassword = '';
        this.newPassword = '';
        this.isEditing = false;
        this.showToastMessage('Perfil y contraseña actualizados exitosamente', 'success');
      },
      error: (error) => {
        console.error('❌ Error al cambiar contraseña:', error);
        let errorMsg = 'Error al cambiar contraseña';
        
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
