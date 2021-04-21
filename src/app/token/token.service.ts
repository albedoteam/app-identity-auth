import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AccountService } from 'src/services/accounts/account.service';
import { AccountModel } from 'src/services/accounts/models/account.model';
import { AuthServerService } from 'src/services/identity/auth-server.service';
import { AuthServerModel } from 'src/services/identity/models/auth-server.model';
import { PasswordRecoveryModel } from 'src/services/identity/models/password-recovery.model';
import { PasswordRecoveryService } from 'src/services/identity/password-recovery.service';
import { UserService } from 'src/services/identity/user.service';
import { LoadingService } from 'src/services/loading.service';
import { LoadingEnum } from 'src/services/models/loading.enum';
import { OktaService } from 'src/services/Okta/okta.service';
import { SessionService } from 'src/services/session.service';
import { SnackBarService } from 'src/services/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private userId!: string;

  private tokenValidatedSubject: BehaviorSubject<boolean>;

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
    private passwordRecoverys: PasswordRecoveryService,
  ) {
    this.tokenValidatedSubject = new BehaviorSubject<boolean>(false);

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

  public tokenValidatedAsync = (): Observable<boolean> => this.tokenValidatedSubject.asObservable();

  public setPassword(password: string) {
    this.loadings.loading(LoadingEnum.token_set_password, true);
    this.users.setPassword(this.accountSubject.getValue()?.id!, this.userId, password).subscribe(
      () => {
        this.snackBars.openBottom('Senha alterada');
        this.users.get(this.userId, `?accountId=${this.accountSubject.getValue()!.id}`).subscribe(
          user => {
            if (user.active) {
              this.okta.auth(user.usernameAtProvider, password);
            }
            else {
              this.snackBars.openBottom('Este usuário está inativo, favor contatar o suporte');
            }
          }
        );
      },
      (error) => {
        this.snackBars.openBottom('Falha ao alterar a senha');
        this.loadings.loading(LoadingEnum.token_set_password, false);
      }
    );
  }

  public checkToken(token: string): void {
    this.loadings.loading(LoadingEnum.token_get_token, true);
    this.passwordRecoverys.get(this.accountSubject.getValue()?.id!, token).subscribe(
      recovery => {
        if (recovery) {
          if (new Date() >= new Date(recovery.expiresAt)) {
            this.loadings.loading(LoadingEnum.token_get_token, false);
            this.snackBars.openBottom('Token inválido');
            this.tokenValidatedSubject.next(false);
            return;
          }

          this.userId = recovery.userId;
          this.loadings.loading(LoadingEnum.token_get_token, false);
          this.tokenValidatedSubject.next(true);
        }
      },
      (error) => {
        this.loadings.loading(LoadingEnum.token_get_token, false);
        this.snackBars.openBottom('Token inválido');
        this.tokenValidatedSubject.next(false);
      }
    );
  }

  public loadAccount(): void {
    this.loadings.loading(LoadingEnum.token_load, true);

    if (this.sessions.accountId() == null)
      this.router.navigate(['/error', '401']);

    this.accounts.get(this.sessions.accountId()!).subscribe(
      account => {
        if (account)
          this.accountSubject.next(account);
        else {
          this.router.navigate(['/error', '401']);
          this.loadings.loading(LoadingEnum.token_load, false);
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

        this.loadings.loading(LoadingEnum.token_load, false);
      }
    );
  }
}