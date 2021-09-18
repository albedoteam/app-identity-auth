import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IdentityService } from 'src/services/identity.service';
import { PasswordRecoveryService } from 'src/services/identity/password-recovery.service';
import { UserService } from 'src/services/identity/user.service';
import { LoadingService } from 'src/services/loading.service';
import { LoadingEnum } from 'src/services/models/loading.enum';
import { OktaService } from 'src/services/Okta/okta.service';
import { SnackBarService } from 'src/services/snack-bar.service';

@Injectable({
	providedIn: 'root'
})
export class TokenService {
	private userId!: string;

	private tokenValidatedSubject: BehaviorSubject<boolean>;

	constructor(
		private snackBars: SnackBarService,
		private loadings: LoadingService,
		private identities: IdentityService,
		private users: UserService,
		private okta: OktaService,
		private passwordRecoverys: PasswordRecoveryService,
	) {
		this.tokenValidatedSubject = new BehaviorSubject<boolean>(false);
	}

	public tokenValidatedAsync = (): Observable<boolean> => this.tokenValidatedSubject.asObservable();

	public setPassword(password: string) {
		this.loadings.loading(LoadingEnum.token_set_password, true);
		this.users.setPassword(this.identities.account$.getValue()!.id!, this.userId, password).subscribe(
			() => {
				this.snackBars.openBottom('Senha alterada');
				this.users.get(this.userId, `?accountId=${this.identities.account$.getValue()!.id!}`).subscribe(
					user => {
						if (user.active) {
							this.snackBars.openBottom('Estamos realizando sua autenticação, por favor aguarde');
							setTimeout(() => {
								this.okta.auth(user.usernameAtProvider, password);
							}, 3000);
						}
						else {
							this.snackBars.openBottom('Este usuário está inativo, favor contatar o suporte');
							this.loadings.loading(LoadingEnum.token_set_password, false);
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
		this.passwordRecoverys.get(this.identities.account$.getValue()!.id!, token).subscribe(
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
}
