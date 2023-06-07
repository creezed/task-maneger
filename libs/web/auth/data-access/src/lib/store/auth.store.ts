import { Injectable } from '@angular/core'

import { LoginAction, LogoutAction, RegistrationAction } from '../actions/auth.actions'
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store'
import { Observable, tap } from 'rxjs'
import { AuthApiService } from '../services/auth-api.service'
import { AuthResponse, UserModel } from '@practica/common'

interface AuthStateModel {
    user: Omit<UserModel, 'password'> | null
    token: string | null
}

export const AUTH_STATE_TOKEN = new StateToken<AuthStateModel>('auth')

@State<AuthStateModel>({
    name: AUTH_STATE_TOKEN,
    defaults: {
        user: null,
        token: null,
    },
})
@Injectable()
export class AuthState {
    constructor(private readonly authApiService: AuthApiService) {}
    @Selector([AUTH_STATE_TOKEN])
    static getToken(state: AuthStateModel): string | null {
        return state.token
    }

    @Selector([AUTH_STATE_TOKEN])
    static getUser(state: AuthStateModel): Omit<UserModel, 'password'> | null {
        return state.user
    }

    @Action(RegistrationAction)
    registration(ctx: StateContext<AuthStateModel>, { payload }: RegistrationAction): Observable<AuthResponse> {
        return this.authApiService.registration$(payload).pipe(
            tap({
                next: (response: AuthResponse) => {
                    ctx.patchState({ user: response.user, token: response.token })
                },
                error: () => {
                    ctx.setState({
                        user: null,
                        token: null,
                    })
                },
            })
        )
    }

    @Action(LoginAction)
    login(ctx: StateContext<AuthStateModel>, { payload }: LoginAction): Observable<AuthResponse> {
        return this.authApiService.login$(payload).pipe(
            tap({
                next: (response) => {
                    ctx.patchState({ user: response.user, token: response.token })
                },
                error: () => {
                    ctx.setState({
                        user: null,
                        token: null,
                    })
                },
            })
        )
    }
    @Action(LogoutAction)
    logout(ctx: StateContext<AuthStateModel>): void {
        ctx.setState({
            token: null,
            user: null,
        })
    }
}
