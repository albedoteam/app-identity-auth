import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IdentityService } from 'src/services/identity.service';
import { CreatePasswordRecoveryModel } from 'src/services/identity/models/create-password-recovery.model';
import { PasswordRecoveryService } from 'src/services/identity/password-recovery.service';
import { UserService } from 'src/services/identity/user.service';
import { LoadingService } from 'src/services/loading.service';
import { LoadingEnum } from 'src/services/models/loading.enum';
import { OktaService } from 'src/services/Okta/okta.service';
import { SnackBarService } from 'src/services/snack-bar.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private snackBars: SnackBarService,
        private loadings: LoadingService,
        private identities: IdentityService,
        private passwordRecoverys: PasswordRecoveryService,
        private users: UserService,
        private okta: OktaService,
        private router: Router,
    ) {
    }

    public changePassword(email: string): void {
        this.loadings.loading(LoadingEnum.auth_login, true);

        let create: CreatePasswordRecoveryModel = {
            accountId: this.identities.account$.getValue()!.id!,
            userEmail: email,
        };

        this.loadings.loading(LoadingEnum.auth_login, true);
        this.passwordRecoverys.create(create).subscribe(
            create => {
                this.router.navigate(['/auth', 'login']);
                this.snackBars.openBottom('Caso o usuário esteja cadastrado, você receberá um e-mail com as instruções para recuperação de senha.');
                this.loadings.loading(LoadingEnum.auth_login, false);
            },
            (error) => {
                this.loadings.loading(LoadingEnum.auth_login, false);
                this.snackBars.openBottom('Falha ao solicitar recuperação de senha.');
            }
        );
    }

    public login(username: string, password: string, rememberMe: boolean) {
        this.loadings.loading(LoadingEnum.auth_login, true);

        var query = this.users.defaultQuery;
        query.pageSize = 1;
        this.users.filterBy(`username eq '${username}'`, query, `accountId=${this.identities.account$.getValue()!.id}`).subscribe(
            pagedUser => {
                if (pagedUser.recordsInPage > 0) {
                    if (rememberMe)
                        localStorage.setItem('remember-me', String(rememberMe));
                    else
                        localStorage.removeItem('remember-me');

                    if (rememberMe)
                        localStorage.setItem('remember-me-email', username);
                    else
                        localStorage.removeItem('remember-me-email');

                    this.okta.auth(pagedUser.items[0].usernameAtProvider, password);
                }
                else {
                    this.snackBars.openBottom('Autenticação inválida');
                    this.loadings.loading(LoadingEnum.auth_login, false);
                }
            }
        );
    }
}
