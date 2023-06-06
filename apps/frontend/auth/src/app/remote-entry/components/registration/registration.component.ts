import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actions, Select, Store } from '@ngxs/store';
import { RegistrationAction } from '@practica/web/auth/data-access';
import {
  ActionsExecuted,
  actionsExecuting,
} from '@ngxs-labs/actions-executing';
import { Observable, takeUntil } from 'rxjs';
import { Routes } from '@practica/web/shared/consts';
import { ComponentUnsub } from '@practica/web/shared/core';
import { AuthResponseViewModel } from '../../../view-model/auth-response.viewmodel';

@Component({
  selector: 'practica-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../auth.style.scss'],
})
export class RegistrationComponent extends ComponentUnsub implements OnInit {
  @Select(actionsExecuting([RegistrationAction]))
  registrationExecuting$: Observable<ActionsExecuted>;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private readonly actions$: Actions,
    private readonly authResponseViewModel: AuthResponseViewModel
  ) {
    super();
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.authResponseViewModel
      .showResult({
        successText: 'Успешная регистрация',
        unknownErrorText: 'Неизвестная ошибка',
        action: RegistrationAction,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => console.log(value));
  }

  get _email() {
    return this.form.get('email');
  }

  get _username() {
    return this.form.get('username');
  }

  get _password() {
    return this.form.get('password');
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.store.dispatch(new RegistrationAction(this.form.value));
  }

  protected readonly Boolean = Boolean;
  protected readonly Routes = Routes;
}
