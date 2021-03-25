import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/services/accounts/account.service';
import { AuthServerService } from 'src/services/identity/auth-server.service';
import { OktaService } from 'src/services/Okta/okta.service';
import { SessionService } from 'src/services/session.service';

@Injectable({
  providedIn: 'root'
})
export class CallbackService {

  constructor(
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
