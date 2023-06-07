import { Actions, ActionType, ofActionCompleted } from '@ngxs/store'
import { Injectable } from '@angular/core'
import { MessageService } from 'primeng/api'
import { HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { Routes } from '@practica/web/common'

interface Options {
    successText: string
    unknownErrorText: string
    action: ActionType
}

@Injectable()
export class AuthResponseViewModel {
    constructor(
        private readonly messageService: MessageService,
        private readonly actions$: Actions,
        private router: Router
    ) {}
    showResult({ successText, unknownErrorText, action }: Options): Observable<unknown> {
        return new Observable((subscriber) => {
            const internalSubscription = this.actions$.pipe(ofActionCompleted(action)).subscribe((value) => {
                if (!value.result.error) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Успех',
                        detail: successText,
                    })
                    subscriber.next(value)
                    subscriber.complete()
                    this.router.navigateByUrl(Routes.HOME)
                    return
                }
                this.getError(value.result.error as HttpErrorResponse, unknownErrorText)
                subscriber.next(value)
                subscriber.complete()
            })
            return () => {
                internalSubscription.unsubscribe()
            }
        })
    }
    private getError(errors: HttpErrorResponse, unknownErrorText: string): void {
        if (Array.isArray(errors.error?.message)) {
            errors.error.message.map((message: string) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Ошибка',
                    detail: message,
                })
            })
            return
        }

        if (errors.error?.message) {
            this.messageService.add({
                severity: 'error',
                summary: 'Ошибка',
                detail: errors.error.message,
            })
            return
        }

        this.messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: unknownErrorText,
        })
    }
}
