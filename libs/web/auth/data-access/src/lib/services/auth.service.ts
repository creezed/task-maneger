import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthState } from '../store/auth.store';
import { LogoutAction } from '../actions/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private store: Store) {}
  getIsAuth() {
    return this.store.select(AuthState.getToken);
  }

  logout() {
    this.store.dispatch(new LogoutAction());
  }
}
