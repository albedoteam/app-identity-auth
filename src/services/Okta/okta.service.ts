import { Injectable } from '@angular/core';
import { AuthTransaction, OktaAuth, TokenResponse } from "@okta/okta-auth-js"
import { OAuthService } from 'angular-oauth2-oidc';
import { Subscription } from 'rxjs';
import { AccountService } from '../accounts/account.service';
import { AuthServerService } from '../identity/auth-server.service';
import { AuthServerModel } from '../identity/models/auth-server.model';
import { LoadingService } from '../loading.service';
import { SnackBarService } from '../snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class OktaService {

  private authServer!: AuthServerModel;
  private authClient!: OktaAuth;
  private authServersSubscription!: Subscription;

  constructor(
    private loadings: LoadingService,
    private snackBars: SnackBarService,
    private oAuthService: OAuthService,
    private authServers: AuthServerService,
  ) {
    this.authServersSubscription = this.authServers.authServerAsync().subscribe(
      authServer => {
        if (authServer) {
          this.authServer = authServer;
          this.authClient = new OktaAuth({
            clientId: this.authServer.clientId,
            authorizeUrl: this.authServer.authUrl,
            tokenUrl: this.authServer.accessTokenUrl,
            issuer: this.authServer.issuer,
          });
        }
      }
    );
  }


  public auth(username: string, password: string): void {
    this.oAuthService.createAndSaveNonce().then(
      nonce => {
        return this.signUp(username, password, nonce);
      });
  }

  private signUp(username: string, password: string, nonce: string): Promise<void> {

    return this.authClient.signInWithCredentials(
      {
        username: username,
        password: password,
      }
    ).then(
      (response) => {
        this.authorized(response, nonce);
      }
    ).catch(
      (error) => {
        this.loadings.setLoading('auth', false);
        this.snackBars.openBottom('Autenticação inválida');
      }
    );
  }


  private authorized(authTransaction: AuthTransaction, nonce: string): Promise<void> {
    if (authTransaction.status === 'SUCCESS') {
      this.loadings.setLoading('auth', false);
      return this.authClient.token.getWithRedirect(
        {
          clientId: this.authServer.clientId,
          responseType: ['id_token', 'token'],
          scopes: this.authServer.basicScopes,
          sessionToken: authTransaction.sessionToken,
          nonce: nonce,
          redirectUri: window.location.origin + '/callback'
        }
      )
    }
    else {
      this.loadings.setLoading('auth', false);
      this.snackBars.openBottom('Autenticação inválida');
      return new Promise<void>((resolve, reject) => {
        resolve();
      });
    }
  }

  public validateToken(): void {
    this.authClient.token.parseFromUrl()
      .then(response => {
        this.token(response);
      });
  }

  public isLoginRedirect = (): boolean => this.authClient.isLoginRedirect();

  private token(response: TokenResponse): void {
    const accessToken = response.tokens.accessToken?.accessToken;

    location.href = `${sessionStorage.getItem('callbackUrl') || ''}?auth=${accessToken}`;
  }
}
