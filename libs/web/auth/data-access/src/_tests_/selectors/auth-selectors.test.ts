import { NgxsModule, Store } from '@ngxs/store'
import { AuthState, AuthStateModel } from '../../store/auth.store'
import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('auth-selectors', () => {
    let store: Store
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, NgxsModule.forRoot([AuthState])],
        })

        store = TestBed.inject(Store)
    })

    it('should select initial data', () => {
        const user = store.selectSnapshot(AuthState.getUser)
        const token = store.selectSnapshot(AuthState.getToken)
        expect(user).toBeNull()
        expect(token).toBeNull()
    })

    it('should return an authorized user', () => {
        const authState: AuthStateModel = {
            user: {
                id: 18,
                username: 'username',
                email: 'email',
            },
            token: 'token',
        }
        store.reset({ auth: authState })
        const user = store.selectSnapshot(AuthState.getUser)
        const token = store.selectSnapshot(AuthState.getToken)
        expect(user).toEqual(authState.user)
        expect(token).toEqual(authState.token)
    })
})
