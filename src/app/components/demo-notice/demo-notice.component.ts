import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';
import { DemoModeService } from '../../services/demo-mode.service';

// Aviso que aparece sobre los formularios de cuenta cuando el sitio no tiene backend
@Component({
  selector: 'app-demo-notice',
  standalone: true,
  imports: [AsyncPipe, IonIcon],
  template: `
    @if (isDemo$ | async) {
      <aside class="demo-notice" role="status">
        <ion-icon name="information-circle-outline" aria-hidden="true"></ion-icon>
        <div>
          <p class="demo-notice__title">Esta tienda es una demostración</p>
          <p>
            Racing con Estilo fue un proyecto estudiantil y no tuvo uso real, por eso su base de datos
            no está publicada. Puedes recorrer el catálogo, pero no es posible crear cuentas, iniciar
            sesión ni comprar.
          </p>
        </div>
      </aside>
    }
  `,
  styles: [`
    .demo-notice {
      display: flex;
      gap: 12px;
      margin-bottom: 28px;
      padding: 16px 18px;
      border: 1px solid var(--rce-line);
      border-left: 4px solid var(--rce-yellow);
      border-radius: 6px;
      background: var(--rce-surface);
      color: var(--rce-ink-soft);
      line-height: 1.55;
    }

    ion-icon {
      flex-shrink: 0;
      margin-top: 2px;
      font-size: 22px;
      color: var(--rce-ink);
    }

    .demo-notice__title {
      margin-bottom: 4px;
      color: var(--rce-ink);
      font-weight: 700;
    }
  `]
})
export class DemoNoticeComponent implements OnInit {
  private demoMode = inject(DemoModeService);
  readonly isDemo$ = this.demoMode.isDemo$;

  ngOnInit() {
    this.demoMode.check().subscribe();
  }
}
