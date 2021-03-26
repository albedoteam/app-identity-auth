import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AccountService } from 'src/services/accounts/account.service';
import { AccountModel } from 'src/services/accounts/models/account.model';
import { AuthServerService } from 'src/services/identity/auth-server.service';
import { AuthServerModel } from 'src/services/identity/models/auth-server.model';
import { UserService } from 'src/services/identity/user.service';
import { LoadingService } from 'src/services/loading.service';
import { LoadingEnum } from 'src/services/models/loading.enum';
import { OktaService } from 'src/services/Okta/okta.service';
import { SessionService } from 'src/services/session.service';
import { SnackBarService } from 'src/services/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accountSubject: BehaviorSubject<AccountModel | null>;

  private accountSubscription!: Subscription;

  private authServerSubject: BehaviorSubject<AuthServerModel | null>;

  private authServerSubscription!: Subscription;

  constructor(
    private sessions: SessionService,
    private snackBars: SnackBarService,
    private loadings: LoadingService,
    private accounts: AccountService,
    private authServers: AuthServerService,
    private users: UserService,
    private okta: OktaService,
    private router: Router,
  ) {
    this.accountSubject = new BehaviorSubject<AccountModel | null>(null);

    this.authServerSubject = new BehaviorSubject<AuthServerModel | null>(null);

    this.accountSubscription = this.accountSubject.subscribe(
      account => {
        if (account) {
          this.sessions.setAccountName(account.displayName);
          this.loadAuthServer(account.id);
        }
      }
    );

    this.authServerSubscription = this.authServerSubject.subscribe(
      authServer => {
        if (authServer)
          this.okta.loadAuthClient(authServer);
      }
    );
  }

  public loadAccount(): void {
    this.loadings.loading(LoadingEnum.auth_load, true);

    if (this.sessions.accountId() == null)
      this.router.navigate(['/error', '401']);
    this.sessions.accountIdAsync().subscribe(
      accountId => {
        if (accountId) {
          this.accounts.get(accountId!).subscribe(
            account => {
              if (account)
                this.accountSubject.next(account);
              else {
                this.router.navigate(['/error', '401']);
                this.loadings.loading(LoadingEnum.auth_load, false);
              }
            }
          );
        }
      }
    );
  }

  public loadAuthServer(accountId: string): void {
    var query = this.authServers.defaultQuery;
    query.pageSize = 1;
    this.authServers.list(query, `accountId=${accountId}`).subscribe(
      pagedAuthServer => {
        if (pagedAuthServer.recordsInPage > 0)
          this.authServerSubject.next(pagedAuthServer.items[0]);
        else
          this.router.navigate(['/error', '401']);

        this.loadings.loading(LoadingEnum.auth_load, false);
      }
    );
  }

  public login(username: string, password: string) {
    this.loadings.loading(LoadingEnum.auth_login, true);

    var query = this.users.defaultQuery;
    query.pageSize = 1;
    this.users.filterBy(username, query, `accountId=${this.accountSubject.getValue()?.id}`).subscribe(
      pagedUser => {
        if (pagedUser.recordsInPage > 0)
          this.okta.auth(pagedUser.items[0].usernameAtProvider, password);
        else {
          this.snackBars.openBottom('Autenticação inválida');
          this.loadings.loading(LoadingEnum.auth_login, false);
        }
      }
    );
  }
}
