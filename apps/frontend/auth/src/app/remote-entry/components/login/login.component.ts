import { Component, OnInit } from '@angular/core';
import { Routes } from '@practica/web/shared/consts';
import { Select, Store } from '@ngxs/store';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginAction } from '@practica/web/auth/data-access';
import { Observable, takeUntil } from 'rxjs';
import {
  ActionsExecuted,
  actionsExecuting,
} from '@ngxs-labs/actions-executing';
import { ComponentUnsub } from '@practica/web/shared/core';
import { AuthResponseViewModel } from '../../../view-model/auth-response.viewmodel';

@Component({
  selector: 'practica-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.style.scss'],
})
export class LoginComponent extends ComponentUnsub implements OnInit {
  @Select(actionsExecuting([LoginAction]))
  loginExecuting$: Observable<ActionsExecuted>;
  form: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store,
    private readonly authResponseViewModel: AuthResponseViewModel
  ) {
    super();
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.authResponseViewModel
      .showResult({
        successText: 'Успешный вход',
        unknownErrorText: 'Неизвестная ошибка',
        action: LoginAction,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => console.log(value));
  }

  get _email(): AbstractControl<any, any> | null {
    return this.form.get('email');
  }

  get _password(): AbstractControl<any, any> | null {
    return this.form.get('password');
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.store.dispatch(new LoginAction(this.form.value));
  }

  protected readonly Routes = Routes;
  protected readonly Boolean = Boolean;
}
