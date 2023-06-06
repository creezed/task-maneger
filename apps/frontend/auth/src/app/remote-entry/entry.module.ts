import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { remoteRoutes } from './entry.routes';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from '@practica/web/auth/data-access';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [RemoteEntryComponent, LoginComponent, RegistrationComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(remoteRoutes),
    NgxsModule.forFeature([AuthState]),
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
  ],
  providers: [],
})
export class RemoteEntryModule {}
