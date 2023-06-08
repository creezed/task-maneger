import { Injectable } from '@angular/core'
import { Store } from '@ngxs/store'
import { AuthState } from '../store/auth.store'
import { LogoutAction } from '../actions/auth.actions'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private store: Store) {}
    getIsAuth(): Observable<string | null> {
        return this.store.select(AuthState.getToken)
    }

    logout(): void {
        this.store.dispatch(new LogoutAction())
    }
}
