import { Injectable } from '@angular/core';
import { AuthTransaction, OktaAuth, TokenResponse } from "@okta/okta-auth-js"
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthServerModel } from '../identity/models/auth-server.model';

@Injectable({
  providedIn: 'root'
})
export class OktaService {

  constructor(
    private oAuthService: OAuthService
  ) {

  }


  public auth(username: string, password: string, authServer: AuthServerModel, callback: (token: string) => void): void {
    this.oAuthService.createAndSaveNonce().then(
      nonce => {
        return this.signUp(username, password, authServer, nonce, callback);
      });
  }

  private signUp(username: string, password: string, authServer: AuthServerModel, nonce: string, callback: (token: string) => void): Promise<void> {

    const authClient = new OktaAuth({
      clientId: authServer.clientId,
      authorizeUrl: authServer.authUrl,
      tokenUrl: authServer.accessTokenUrl,
      issuer: authServer.issuer,
    });

    return authClient.signInWithCredentials({
      username: username,
      password: password,
    }).then((response) => {
      this.authorized(authClient, response, authServer, nonce, callback);
    }).catch((error) => {
      console.error(error);
    });
  }


  private authorized(authClient: OktaAuth, authTransaction: AuthTransaction, authServer: AuthServerModel, nonce: string, callback: (token: string) => void): Promise<void> {
    if (authTransaction.status === 'SUCCESS') {
      return authClient.token.getWithoutPrompt({
        clientId: authServer.clientId,
        responseType: ['id_token', 'token', 'refresh_token'],
        scopes: authServer.basicScopes,
        sessionToken: authTransaction.sessionToken,
        nonce: nonce,
        redirectUri: window.location.origin + '/callback'
      })
        .then((responseTokens) => {
          this.validateToken(responseTokens, callback);
        });
    } else {
      throw new Error('We cannot handle the ' + authTransaction.status + ' status');
    }
  }

  private validateToken(response: TokenResponse, callback: (token: string) => void): void {
    const idToken = response.tokens.idToken?.idToken;
    const accessToken = response.tokens.accessToken?.accessToken;
    const refreshToken = response.tokens.refreshToken?.refreshToken;
    const keyValuePair = `id_token=${encodeURIComponent(idToken!)}&access_token=${encodeURIComponent(accessToken!)}&refresh_token=${encodeURIComponent(refreshToken!)}`;

    this.redirecto(keyValuePair, callback)
  }

  private redirecto(keyValuePair: string, callback: (token: string) => void): void {
    this.oAuthService.tryLogin({
      customHashFragment: keyValuePair,
      disableOAuth2StateCheck: true,
    }).then(() => {
      callback(`#${keyValuePair}`);
    });
  }
}
