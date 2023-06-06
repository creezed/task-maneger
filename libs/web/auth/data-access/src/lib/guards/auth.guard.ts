import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';
import { Routes } from '@practica/web/shared/consts';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getIsAuth().pipe(
    map((value) => Boolean(value)),
    catchError(() => {
      router.navigate([Routes.HOME]);
      return of(false);
    })
  );
};
