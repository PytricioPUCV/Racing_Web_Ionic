import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme: 'light' | 'dark' = 'light';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  checkAndApplyTheme() {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      this.currentTheme = savedTheme;
      if (savedTheme === 'dark') {
        this.renderer.addClass(document.body, 'dark');
      }
    }
  }

  toggleTheme() {
    if (this.currentTheme === 'light') {
      this.currentTheme = 'dark';
      this.renderer.addClass(document.body, 'dark');
    } else {
      this.currentTheme = 'light';
      this.renderer.removeClass(document.body, 'dark');
    }
    localStorage.setItem('theme', this.currentTheme);
  }
}