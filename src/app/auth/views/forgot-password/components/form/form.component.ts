import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
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

	public loading_auth_login$!: Observable<boolean>;

	public forgotMyPasswordForm!: FormGroup;

	private loadingAuthSubscription!: Subscription;

	constructor(
		private loadings: LoadingService,
		private authService: AuthService,
		private spinners: NgxSpinnerService
	) {
	}

	ngOnInit() {

		this.loading_auth_login$ = this.loadings.loadingAsync(LoadingEnum.auth_login);

		this.forgotMyPasswordForm = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.email])
		});

		this.loadingAuthSubscription = this.loading_auth_login$.subscribe(
			loading => {
				if (loading) {
					this.forgotMyPasswordForm.disable();
					this.spinners.show('forgot-my-password');
				}
				else {
					this.forgotMyPasswordForm.enable();
					this.spinners.hide('forgot-my-password');
				}
			}
		);
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.forgotMyPasswordForm.controls[controlName].hasError(errorName);
	}

	public login = ($event: Event): void => {
		$event.preventDefault();
		this.authService.changePassword(this.forgotMyPasswordForm.value["email"]);
	}
}
