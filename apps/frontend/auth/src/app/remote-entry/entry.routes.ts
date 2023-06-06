import { Route } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

export const remoteRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'login',
    canActivate: [],
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    title: 'registration',
    canActivate: [],
  },
];
