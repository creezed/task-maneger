import { Component } from '@angular/core'

@Component({
    selector: 'practica-frontend-auth-entry',
    template: `
        <section class="h-full flex justify-content-center align-items-center flex-column">
            <router-outlet></router-outlet>
        </section>
    `,
})
export class RemoteEntryComponent {}
