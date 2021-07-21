import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subscription } from 'rxjs';
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

	public loading_auth_login$!: Observable<boolean>;

	public authForm!: FormGroup;

	private loadingAuthSubscription!: Subscription;

	public darkMode$!: Observable<boolean>;

	constructor(
		private darkMode: DarkModeService,
		private loadings: LoadingService,
		private authService: AuthService,
		private spinners: NgxSpinnerService,
	) {
	}

	ngOnInit() {
		this.loading_auth_login$ = this.loadings.loadingAsync(LoadingEnum.auth_login);

		this.darkMode$ = this.darkMode.isDarkMode$;

		const rememberMe: boolean = Boolean(localStorage.getItem('remember-me') || false);
		const rememberMeEmail: string = localStorage.getItem('remember-me-email') || '';

		this.authForm = new FormGroup({
			username: new FormControl(rememberMeEmail, [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
			rememberMe: new FormControl(rememberMe)
		});

		this.loadingAuthSubscription = this.loading_auth_login$.subscribe(
			loading => {
				if (loading) {
					this.spinners.show('auth');
					this.authForm.disable();
				}
				else {
					this.spinners.hide('auth');
					this.authForm.enable();
				}
			}
		)
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.authForm.controls[controlName].hasError(errorName);
	}

	public login = ($event: Event): void => {
		$event.preventDefault();
		this.authService.login(this.authForm.value["username"], this.authForm.value["password"], this.authForm.value["rememberMe"]);
	}
}
