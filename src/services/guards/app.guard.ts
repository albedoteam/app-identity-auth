import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { SessionService } from "../session.service";

@Injectable({
    providedIn: 'root'
})
export class AppGuard implements CanActivate {

    constructor(
        private sessions: SessionService,
        private router: Router,
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        debugger;
        if (route.queryParams.account && route.queryParams.callbackUrl) {
            this.sessions.setAccountId(route.queryParams.account);
            this.sessions.setCallbackUrl(route.queryParams.callbackUrl);
            return true;
        }
        else if (this.sessions.accountId() != null && this.sessions.callbackUrl() != null) {
            return true;
        }
        else {
            this.sessions.setAccountId(null);
            this.sessions.setCallbackUrl(null);

            this.router.navigate(['/error', '401']);
            return false;
        }
    }
}
