import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AuthResponse,
  LoginParams,
  RegistrationParams,
} from '@practica/shared/types';
import { Observable } from 'rxjs';
import { apiUrl } from '@practica/shared/consts';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  constructor(private readonly http: HttpClient) {}

  login$(params: LoginParams): Observable<AuthResponse> {
    const url = apiUrl + '/v1/auth/local/login';
    return this.http.post<AuthResponse>(url, params);
  }

  registration$(params: RegistrationParams): Observable<AuthResponse> {
    const url = apiUrl + '/v1/auth/local/registration';
    return this.http.post<AuthResponse>(url, params);
  }
}
