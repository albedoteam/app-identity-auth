import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { LoadingService } from 'src/services/loading.service';
import { LoadingEnum } from 'src/services/models/loading.enum';

@Component({
    selector: 'at-fp-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class ForgetPasswordFormComponent implements OnInit {

    public loading_auth_load$!: Observable<boolean>;
    public loading_auth_login$!: Observable<boolean>;

    public authForm!: FormGroup;

    private loadingLoadSubscription!: Subscription;
    private loadingAuthSubscription!: Subscription;

    constructor(
        private loadings: LoadingService,
        private authService: AuthService,
    ) {
    }

    ngOnInit() {

        this.loading_auth_load$ = this.loadings.loadingAsync(LoadingEnum.auth_load);
        this.loading_auth_login$ = this.loadings.loadingAsync(LoadingEnum.auth_login);

        this.authForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email])
        });

        this.loadingLoadSubscription = this.loading_auth_load$.subscribe(
            loading => {
                if (loading) {
                    this.authForm.controls['email'].disable();
                }
                else {
                    this.authForm.controls['email'].enable();
                }
            }
        );

        this.loadingAuthSubscription = this.loading_auth_login$.subscribe(
            loading => {
                if (loading) {
                    this.authForm.controls['email'].disable();
                }
                else {
                    this.authForm.controls['email'].enable();
                }
            }
        );
    }

    public hasError = (controlName: string, errorName: string) => {
        return this.authForm.controls[controlName].hasError(errorName);
    }

    public login = ($event: Event): void => {
        $event.preventDefault();
        this.authService.changePassword(this.authForm.value["email"]);
    }
}
