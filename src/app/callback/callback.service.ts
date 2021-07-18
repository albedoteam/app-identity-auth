import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IdentityService } from 'src/services/identity.service';
import { OktaService } from 'src/services/Okta/okta.service';

@Injectable({
    providedIn: 'root'
})
export class CallbackService {

    constructor(
        private identities: IdentityService,
        private oktas: OktaService,
        private router: Router,
    ) {

    }

    public validateRedirection(): void {
        if (this.oktas.isLoginRedirect()) {
            this.oktas.validateToken();
        }
        else {
            this.router.navigate(['/error', '401'], {
                queryParams: null,
                replaceUrl: true
            });
        }
    }
}
