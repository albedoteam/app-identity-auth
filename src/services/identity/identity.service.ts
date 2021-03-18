import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountService } from '../accounts/account.service';
import { Paged } from '../models/paged-type.model';
import { OktaService } from '../Okta/okta.service';
import { AuthServerService } from './auth-server.service';
import { AuthServerModel } from './models/auth-server.model';
import { UserModel } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  private server: AuthServerModel | null;
  private server$: Observable<AuthServerModel | null>;
  private authServerSubscription: Subscription;

  private accountId: string | null;
  private accountId$: Observable<string | null>;
  private accountIdSubscription: Subscription;

  constructor(
    private http: HttpClient,
    private accounts: AccountService,
    private authServers: AuthServerService,
    private okta: OktaService,
  ) {
    this.accountId = "";
    this.accountId$ = this.accounts.accountIdAsync();
    this.accountIdSubscription = this.accounts.accountIdAsync().subscribe(
      id => {
        this.accountId = id;
      }
    );

    this.server = null;
    this.server$ = this.authServers.authServerAsync();
    this.authServerSubscription = this.authServers.authServerAsync().subscribe(
      authServer => {
        if (authServer)
          this.server = authServer;
      }
    );
  }

  public login(username: string, password: string): void {
    this.getUser(username).subscribe(pagedUser => {
      if (pagedUser.recordsInPage == 1) {
        this.okta.auth(pagedUser.items[0].usernameAtProvider, password, this.server!, this.callback);
      }
    });
  }

  private getUser(username: string): Observable<Paged<UserModel>> {
    return this.http.get<Paged<UserModel>>(
      `${environment.identity}/user?page=1&pageSize=1&filterBy=${username}&accountId=${this.accountId}`
    );
  }

  private callback(token: string): void {
    var url = sessionStorage.getItem('callbackUrl');
    location.href = `${url}${token}`;
  }
}
