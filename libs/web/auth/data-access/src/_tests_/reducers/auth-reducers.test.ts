import { NgxsModule, Store } from '@ngxs/store'
import { AuthState, AuthStateModel } from '../../store/auth.store'
import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { AuthApiService } from '../../services/auth-api.service'
import { AuthResponse, LoginParams, RegistrationParams } from '@practica/common'
import { of, throwError } from 'rxjs'
import { LoginAction, LogoutAction, RegistrationAction } from '../../actions/auth.actions'

describe('auth-reducers', () => {
    let store: Store
    let authApiService: AuthApiService
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, NgxsModule.forRoot([AuthState])],
            providers: [
                {
                    provide: AuthApiService,
                    useValue: {
                        registration$: jest.fn(),
                        login$: jest.fn(),
                    },
                },
            ],
        })

        store = TestBed.inject(Store)
        authApiService = TestBed.inject(AuthApiService)
    })

    it('should registration user successfully', () => {
        const registrationPayload: RegistrationParams = { email: 'bob@bob.b', password: 'bobin', username: 'bobik' }
        const authResponse: AuthResponse = { user: { id: 8, email: 'bob@bob.b', username: 'bobik' }, token: 'token' }

        const mockRegistration = authApiService.registration$ as jest.Mock

        mockRegistration.mockReturnValue(of(authResponse))

        store.dispatch(new RegistrationAction(registrationPayload))

        const state: AuthStateModel = store.selectSnapshot(AuthState.getState)
        expect(state.user).toEqual(authResponse.user)
        expect(state.token).toEqual(authResponse.token)
    })

    it('should handle registration error', () => {
        const registrationPayload: RegistrationParams = { email: 'bob@bob.b', password: 'bobin', username: 'bobik' }
        const mockRegistration = authApiService.registration$ as jest.Mock

        mockRegistration.mockReturnValue(throwError(() => new Error('error')))

        store.dispatch(new RegistrationAction(registrationPayload))
        const state: AuthStateModel = store.selectSnapshot(AuthState.getState)
        expect(state.user).toBeNull()
        expect(state.token).toBeNull()
    })

    it('should login user successfully', () => {
        const loginParams: LoginParams = { email: 'bob@bob.b', password: 'bobin' }
        const authResponse: AuthResponse = { user: { id: 8, email: 'bob@bob.b', username: 'bobik' }, token: 'token' }
        const mockLogin = authApiService.login$ as jest.Mock

        mockLogin.mockReturnValue(of(authResponse))

        store.dispatch(new LoginAction(loginParams))
        const state: AuthStateModel = store.selectSnapshot(AuthState.getState)
        expect(state.user).toEqual(authResponse.user)
        expect(state.token).toEqual(authResponse.token)
    })

    it('should handle login error', () => {
        const loginPayload: LoginParams = { email: 'bob@bob.b', password: 'bobin' }
        const mockLogin = authApiService.login$ as jest.Mock

        mockLogin.mockReturnValue(throwError(() => new Error('error')))

        store.dispatch(new LoginAction(loginPayload))
        const state: AuthStateModel = store.selectSnapshot(AuthState.getState)
        expect(state.user).toBeNull()
        expect(state.token).toBeNull()
    })

    it('should logout user', () => {
        store.dispatch(new LogoutAction())

        const state: AuthStateModel = store.selectSnapshot(AuthState.getState)
        expect(state.user).toBeNull()
        expect(state.token).toBeNull()
    })
})
