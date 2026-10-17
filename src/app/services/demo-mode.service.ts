import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// Modo demo: el sitio publicado (p. ej. Vercel) no tiene backend ni base de datos.
// El catálogo usa los productos locales sin avisar; el aviso solo aparece al intentar
// iniciar sesión, crear una cuenta o comprar.
@Injectable({
  providedIn: 'root'
})
export class DemoModeService {
  private http = inject(HttpClient);
  private demoSubject = new BehaviorSubject<boolean>(false);
  private probe$?: Observable<boolean>;

  readonly isDemo$ = this.demoSubject.asObservable();

  get isDemo(): boolean {
    return this.demoSubject.value;
  }

  // Sin backend la petición no conecta (status 0) o el hosting responde index.html
  // en vez de JSON (status 200 con error de parseo). Un 404 o 500 de un backend real no cuenta.
  isBackendMissing(error: unknown): boolean {
    if (!environment.demoFallback || !(error instanceof HttpErrorResponse)) {
      return false;
    }
    return error.status === 0 || error.status === 200;
  }

  // Devuelve true (y activa el modo demo) si el error indica que no hay backend
  reportError(error: unknown): boolean {
    const missing = this.isBackendMissing(error);
    if (missing) {
      this.demoSubject.next(true);
    }
    return missing;
  }

  // Comprueba una sola vez por sesión si hay backend disponible
  check(): Observable<boolean> {
    if (!environment.demoFallback) {
      return of(false);
    }

    this.probe$ ??= this.http.get(`${environment.apiUrl}/categories`).pipe(
      map(() => false),
      catchError(error => of(this.isBackendMissing(error))),
      tap(isDemo => {
        if (isDemo) this.demoSubject.next(true);
      }),
      shareReplay(1)
    );

    return this.probe$;
  }
}
