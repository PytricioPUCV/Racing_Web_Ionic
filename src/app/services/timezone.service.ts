import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {
  private userTimezone: string;

  constructor() {
    this.userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log('🌍 Timezone detectado:', this.userTimezone);
  }

  getUserTimezone(): string {
    return this.userTimezone;
  }

  convertToUserTimezone(isoDate: string): DateTime {
    return DateTime.fromISO(isoDate).setZone(this.userTimezone);
  }

  formatDate(isoDate: string, format: string = 'dd/MM/yyyy HH:mm'): string {
    return this.convertToUserTimezone(isoDate).toFormat(format);
  }

  formatRelative(isoDate: string): string | null {
    return this.convertToUserTimezone(isoDate).toRelative();
  }

  getCurrentTime(): DateTime {
    return DateTime.now().setZone(this.userTimezone);
  }
}