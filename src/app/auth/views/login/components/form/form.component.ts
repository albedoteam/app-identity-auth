import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { concat, merge, Observable, pipe, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DarkModeService } from 'src/services/dark-mode.service';
import { LoadingService } from 'src/services/loading.service';
import { LoadingEnum } from 'src/services/models/loading.enum';

@Component({
    selector: 'at-login-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class LoginFormComponent implements OnInit {

    public loading_auth_load$!: Observable<boolean>;
    public loading_auth_login$!: Observable<boolean>;

    public authForm!: FormGroup;

    private loadingLoadSubscription!: Subscription;
    private loadingAuthSubscription!: Subscription;

    public darkMode$!: Observable<boolean>;

    constructor(
        private darkMode: DarkModeService,
        private loadings: LoadingService,
        private authService: AuthService,
    ) {
    }

    ngOnInit() {
        this.loading_auth_load$ = this.loadings.loadingAsync(LoadingEnum.auth_load);
        this.loading_auth_login$ = this.loadings.loadingAsync(LoadingEnum.auth_login);

        this.darkMode$ = this.darkMode.isDarkMode$.asObservable();

        this.authForm = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
        });

        this.loadingLoadSubscription = this.loading_auth_load$.subscribe(
            loading => {
                if (loading) {
                    this.authForm.controls['username'].disable();
                    this.authForm.controls['password'].disable();
                }
                else {
                    this.authForm.controls['username'].enable();
                    this.authForm.controls['password'].enable();
                }
            }
        )
        this.loadingAuthSubscription = this.loading_auth_login$.subscribe(
            loading => {
                if (loading) {
                    this.authForm.controls['username'].disable();
                    this.authForm.controls['password'].disable();
                }
                else {
                    this.authForm.controls['username'].enable();
                    this.authForm.controls['password'].enable();
                }
            }
        )
    }

    public hasError = (controlName: string, errorName: string) => {
        return this.authForm.controls[controlName].hasError(errorName);
    }

    public login = ($event: Event): void => {
        $event.preventDefault();
        this.authService.login(this.authForm.controls["username"].value, this.authForm.controls["password"].value);
    }
}
