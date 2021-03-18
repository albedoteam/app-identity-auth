import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AccountService } from 'src/services/accounts/account.service';
import { AccountModel } from 'src/services/accounts/models/account.model';
import { AuthServerService } from 'src/services/identity/auth-server.service';
import { IdentityService } from 'src/services/identity/identity.service';
import { LoadingService } from 'src/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private callbackUrl: string | null;
  private accountId: string | null;

  private accountSubscription: Subscription;

  constructor(
    private loadings: LoadingService,
    private identities: IdentityService,
    private authServers: AuthServerService,
    private accounts: AccountService,
    private router: Router,
  ) {
    this.accountId = sessionStorage.getItem('account_albedo');
    this.callbackUrl = sessionStorage.getItem('callbackUrl');

    this.accountSubscription = this.accounts.accountIdAsync().subscribe(
      id => {
        if (id) {
          this.authServers.requestAuthServer(id);
        }
      }
    );
  }

  login(username: string, password: string) {
    this.loadings.setLoading('auth', true);
    this.identities.login(username, password);
  }

  validate() {
    if (!this.callbackUrl || !this.accountId)
      this.router.navigate(['/error', '401']);
  }
}
