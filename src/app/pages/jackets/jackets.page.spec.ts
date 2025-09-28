import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JacketsPage } from './jackets.page';

describe('JacketsPage', () => {
  let component: JacketsPage;
  let fixture: ComponentFixture<JacketsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JacketsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
