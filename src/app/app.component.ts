import { Component, OnInit } from '@angular/core';  // ← Agregar OnInit
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, searchOutline, bagHandleOutline, sunnyOutline, moonOutline } from 'ionicons/icons';
import { ThemeService } from './services/theme';
import { CartService } from './services/cart.service';  // ← NUEVO
import { StorageService } from './services/storage.service';  // ← NUEVO

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {  // ← Agregar OnInit
  
  constructor(
    private themeService: ThemeService,
    private cartService: CartService,      // ← NUEVO
    private storageService: StorageService  // ← NUEVO
  ) {
    addIcons({ personOutline, searchOutline, bagHandleOutline, sunnyOutline, moonOutline });
    this.themeService.checkAndApplyTheme();
  }

  async ngOnInit() {
    console.log('🚀 Iniciando aplicación Racing Web...');
    
    // Inicializar Storage
    await this.storageService.init();
    console.log('💾 Storage inicializado');
    
    // Sincronizar carrito local con servidor
    await this.syncCart();
    
    // Detectar cambios de conexión (opcional, requiere @capacitor/network)
    this.setupNetworkListener();
  }

  private async syncCart() {
    try {
      await this.cartService.syncLocalCartToServer();
      console.log('✅ Carrito sincronizado con el servidor');
    } catch (error) {
      console.warn('⚠️ No se pudo sincronizar el carrito (posible modo offline):', error);
    }
  }

  private setupNetworkListener() {
    // Detectar cuando recupera conexión a internet
    window.addEventListener('online', async () => {
      console.log('🌐 Conexión restaurada, sincronizando carrito...');
      await this.syncCart();
    });

    window.addEventListener('offline', () => {
      console.log('📡 Sin conexión, modo offline activado');
    });
  }
}
