import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/services/accounts/account.service';
import { AuthServerService } from 'src/services/identity/auth-server.service';
import { LoadingService } from 'src/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  private accountId: string | null;
  private callbackUrl: string | null;

  private accountSubscription: Subscription;
  private authServerSubscription: Subscription;

  constructor(
    private loadings: LoadingService,
    private authServers: AuthServerService,
    private accounts: AccountService,
    private router: Router,
  ) {
    this.accountId = null;
    this.callbackUrl = null;

    this.accountSubscription = this.accounts.accountAsync().subscribe(
      account => {
        if (account) {
          this.authServers.requestAuthServer(account.id)
        }
      }
    );

    this.authServerSubscription = this.authServers.authServerAsync().subscribe(
      server => {
        if (server) {
          this.loadings.setLoading('redirect', false);

          if (this.accountId && this.callbackUrl)
            this.router.navigate(['/auth']);
        }
      }
    );
  }

  public load(): void {
    this.loadings.setLoading('redirect', true);
    this.accounts.setAccount(this.accountId!);
  }

  public setAccountId(accountId: string): void {
    this.accountId = accountId;
  }

  public setCallbackUrl(callbackUrl: string): void {
    this.callbackUrl = callbackUrl;
    sessionStorage.setItem('callbackUrl', callbackUrl);
  }
}
