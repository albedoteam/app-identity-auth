import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/services/accounts/account.service';
import { AuthServerService } from 'src/services/identity/auth-server.service';
import { OktaService } from 'src/services/Okta/okta.service';

@Injectable({
  providedIn: 'root'
})
export class CallbackService {

  private accountSubscription!: Subscription;

  constructor(
    private authServers: AuthServerService,
    private accounts: AccountService,
    private oktas: OktaService,
    private router: Router,
  ) {
    this.accountSubscription = this.accounts.accountIdAsync().subscribe(
      id => {
        if (id) {
          this.authServers.requestAuthServer(id);
        }
      }
    );
  }


  public validateRedirection(): void {
    this.authServers.authServerAsync().subscribe(
      authServer => {
        if (authServer) {
          if (this.oktas.isLoginRedirect()) {
            this.oktas.validateToken();
          }
          else {
            this.router.navigate(['/error', '401']);
          }
        }
      }
    );
  }
}
