import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {
  private userTimezone: string;

  constructor() {
    // Detectar timezone del navegador automáticamente
    this.userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log('🌍 Timezone detectado:', this.userTimezone);
  }

  getUserTimezone(): string {
    return this.userTimezone;
  }

  // Convertir fecha ISO a timezone del usuario
  convertToUserTimezone(isoDate: string): DateTime {
    return DateTime.fromISO(isoDate).setZone(this.userTimezone);
  }

  // Formatear fecha en timezone del usuario
  formatDate(isoDate: string, format: string = 'dd/MM/yyyy HH:mm'): string {
    return this.convertToUserTimezone(isoDate).toFormat(format);
  }

  // Formatear fecha de forma relativa
  formatRelative(isoDate: string): string | null {
    return this.convertToUserTimezone(isoDate).toRelative();
  }

  // Obtener hora actual en timezone del usuario
  getCurrentTime(): DateTime {
    return DateTime.now().setZone(this.userTimezone);
  }
}