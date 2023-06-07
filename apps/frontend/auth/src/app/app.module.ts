import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component'
import { appRoutes } from './app.routes'
import { ConfirmationService, MessageService } from 'primeng/api'
import { NgxsModule } from '@ngxs/store'
import { AuthState } from '@practica/web/auth/data-access'
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin'
import { HttpClientModule } from '@angular/common/http'
import { ToastModule } from 'primeng/toast'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgxsActionsExecutingModule } from '@ngxs-labs/actions-executing'
import { AuthResponseViewModel } from './view-model/auth-response.viewmodel'

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ToastModule,
        RouterModule.forRoot(appRoutes),
        NgxsModule.forRoot([AuthState]),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NgxsStoragePluginModule.forRoot({ key: AuthState }),
        NgxsActionsExecutingModule.forRoot(),
    ],
    providers: [ConfirmationService, MessageService, AuthResponseViewModel],
    bootstrap: [AppComponent],
})
export class AppModule {}
