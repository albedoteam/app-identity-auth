import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { IdentityService } from "../identity.service";
import { SessionService } from "../session.service";

@Injectable({
    providedIn: 'root'
})
export class AppGuard implements CanActivate {

    constructor(
        private identities: IdentityService,
        private sessions: SessionService,
        private router: Router,
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (route.queryParams.account && route.queryParams.callbackUrl) {
            this.sessions.setAccountId(route.queryParams.account);
            this.sessions.setCallbackUrl(route.queryParams.callbackUrl);
            this.identities.loadAccount();
            return true;
        }
        else if (this.sessions.accountId() != null && this.sessions.callbackUrl() != null) {
            this.identities.loadAccount();
            return true;
        }
        else {
            this.sessions.setAccountId(null);
            this.sessions.setCallbackUrl(null);
            this.identities.loaded$.next("not-loaded");
            this.router.navigate(['/error', '401']);
            return false;
        }
    }
}
