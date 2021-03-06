import { Injectable } from '@angular/core';
import { AuthTransaction, OktaAuth, TokenResponse } from "@okta/okta-auth-js"
import { OAuthService } from 'angular-oauth2-oidc';
import { DarkModeService } from '../dark-mode.service';
import { AuthServerModel } from '../identity/models/auth-server.model';
import { LoadingService } from '../loading.service';
import { LoadingEnum } from '../models/loading.enum';
import { SessionService } from '../session.service';
import { SnackBarService } from '../snack-bar.service';

@Injectable({
	providedIn: 'root'
})
export class OktaService {

	private authServer!: AuthServerModel;
	private authClient!: OktaAuth;

	constructor(
		private darkMode: DarkModeService,
		private sessions: SessionService,
		private loadings: LoadingService,
		private snackBars: SnackBarService,
		private oAuthService: OAuthService,
	) {

	}

	public loadAuthClient(authServer: AuthServerModel) {
		this.authServer = authServer;
		this.authClient = new OktaAuth({
			clientId: this.authServer.clientId,
			authorizeUrl: this.authServer.authUrl,
			tokenUrl: this.authServer.accessTokenUrl,
			issuer: this.authServer.issuer,
		});
	}

	public auth(username: string, password: string): void {
		this.oAuthService.createAndSaveNonce().then(
			nonce => {
				return this.signUp(username, password, nonce);
			}).catch(
				() => {
					this.loadings.loading(LoadingEnum.auth_login, false);
					this.snackBars.openBottom('Autenticação inválida');
				}
			);
	}

	private signUp(username: string, password: string, nonce: string): Promise<void> {

		return this.authClient.signInWithCredentials(
			{
				username,
				password,
			}
		).then(
			(response) => {
				this.authorized(response, nonce)
					.then(
						() => {
							this.snackBars.openBottom('Usuário autenticado, preparando redirecionamento');
						}
					).catch(
						() => {
							this.loadings.loading(LoadingEnum.auth_login, false);
							this.snackBars.openBottom('Autenticação inválida');
						}
					);
			}
		).catch(
			() => {
				this.loadings.loading(LoadingEnum.auth_login, false);
				this.snackBars.openBottom('Autenticação inválida');
			}
		);
	}


	private authorized(authTransaction: AuthTransaction, nonce: string): Promise<void> {
		if (authTransaction.status === 'SUCCESS') {
			return this.authClient.token.getWithRedirect(
				{
					clientId: this.authServer.clientId,
					responseType: ['id_token', 'token'],
					scopes: this.authServer.basicScopes,
					sessionToken: authTransaction.sessionToken,
					nonce: nonce,
					redirectUri: window.location.origin + '/callback'
				}
			);
		}
		else {
			this.loadings.loading(LoadingEnum.auth_login, false);
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

		location.href = `${this.sessions.callbackUrl() || ''}?auth=${accessToken}&darkMode=${this.darkMode.isDarkMode$.getValue()}&${this.sessions.urlSearch()}`;
	}
}
