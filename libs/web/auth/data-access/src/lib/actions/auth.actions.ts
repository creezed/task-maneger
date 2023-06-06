import { LoginParams, RegistrationParams } from '@practica/shared/types';

export class RegistrationAction {
  static readonly type = '[Auth] Register';
  constructor(public payload: RegistrationParams) {}
}

export class LoginAction {
  static readonly type = '[Auth] Login';
  constructor(public payload: LoginParams) {}
}

export class LogoutAction {
  static readonly type = '[Auth] Logout';
}
