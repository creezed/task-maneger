import { Component } from '@angular/core';
import { AuthService } from '@practica/web/auth/data-access';
import { Routes } from '@practica/web/common';

@Component({
  selector: 'practica-root',
  template: `
    <header
      class="flex flex-row justify-content-between align-items-center h-3rem"
    >
      <nav class="flex gap-3">
        <a
          class="text-color-secondary text-lg no-underline hover:text-primary"
          [routerLink]="[Routes.LOGIN]"
          >Вход</a
        >
        <a
          class="text-color-secondary hover:text-primary text-lg no-underline"
          [routerLink]="[Routes.REGISTRATION]"
          >Регистрация</a
        >

        <span
          >Статус
          <span class="text-primary">{{
            (isAuth$ | async) ? 'Авторизован' : 'Не авторизован'
          }}</span></span
        >
        <span
          *ngIf="isAuth$ | async"
          class="cursor-pointer"
          (click)="authService.logout()"
          >Выход</span
        >
      </nav>
    </header>
    <section
      class="h-full flex justify-content-center align-items-center flex-column"
    >
      <router-outlet></router-outlet>
    </section>
    <p-toast></p-toast>
  `,
})
export class AppComponent {
  constructor(readonly authService: AuthService) {}

  isAuth$ = this.authService.getIsAuth();

  protected readonly Routes = Routes;
}
