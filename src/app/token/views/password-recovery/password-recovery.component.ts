import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subscription } from 'rxjs';
import { DarkModeService } from 'src/services/dark-mode.service';
import { LoadingService } from 'src/services/loading.service';
import { LoadingEnum } from 'src/services/models/loading.enum';
import { SessionService } from 'src/services/session.service';
import { TokenService } from '../../token.service';

@Component({
	selector: 'app-password-recovery',
	templateUrl: './password-recovery.component.html',
	styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {

	public darkMode$!: Observable<boolean>;

	@ViewChild("token1")
	public token1!: ElementRef<HTMLInputElement>;
	@ViewChild("token2")
	public token2!: ElementRef<HTMLInputElement>;
	@ViewChild("token3")
	public token3!: ElementRef<HTMLInputElement>;
	@ViewChild("token4")
	public token4!: ElementRef<HTMLInputElement>;
	@ViewChild("token5")
	public token5!: ElementRef<HTMLInputElement>;
	@ViewChild("token6")
	public token6!: ElementRef<HTMLInputElement>;

	public loading_get$ = this.loadings.loadingAsync(LoadingEnum.token_get_token);
	public loading_change_password$ = this.loadings.loadingAsync(LoadingEnum.token_set_password);

	public tokenForm!: FormGroup;
	public passwordForm!: FormGroup;

	private accountNameSubscription!: Subscription;
	private validatedSubscription!: Subscription;
	private loadingChangeSubscription!: Subscription;

	constructor(
		private darkMode: DarkModeService,
		private spinners: NgxSpinnerService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private loadings: LoadingService,
		public title: Title,
		private tokens: TokenService,
		private sessions: SessionService,
	) {
	}

	ngOnInit(): void {

		this.darkMode$ = this.darkMode.isDarkMode$;

		this.tokenForm = new FormGroup({
			token1: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
			token2: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
			token3: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
			token4: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
			token5: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
			token6: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
		});

		this.passwordForm = new FormGroup({
			password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
			confirmation: new FormControl('', [Validators.required, this.confirmPassword])
		});

		this.passwordForm.disable();
		this.passwordForm.setErrors(null);

		if (this.activatedRoute.snapshot.queryParamMap.keys.length > 0) {
			this.router.navigate([],
				{
					queryParams: null,
					replaceUrl: true
				});
		}

		this.validatedSubscription = this.tokens.tokenValidatedAsync().subscribe(
			validated => {
				if (validated) {
					if (!this.tokenForm.disabled)
						this.tokenForm.disable();

					if (this.passwordForm.disabled)
						this.passwordForm.enable();
				}
				else {
					if (this.tokenForm.disabled) {
						this.tokenForm.enable();
						this.tokenForm.reset();
						this.token1.nativeElement.focus();
					}

					if (!this.passwordForm.disabled)
						this.passwordForm.disable();
				}

				this.spinners.hide('check-code');
			}
		);

		this.accountNameSubscription = this.sessions.accountNameAsync().subscribe(
			accountName => {
				if (accountName)
					this.title.setTitle(`${accountName} - Recuperação de senha`);
			}
		);

		this.loadingChangeSubscription = this.loading_change_password$.subscribe(
			loading => {
				if (loading)
					this.spinners.show('password-recovery');
				else
					this.spinners.hide('password-recovery');
			}
		);
	}

	private confirmPassword(confirmationControl: FormControl): ValidationErrors | null {
		var parent = confirmationControl.parent! as FormGroup;

		if (!parent) return null;

		if (confirmationControl.value == parent.value["password"]) {
			confirmationControl.setErrors(null);
			return null;
		}
		else {
			return { not_match: true };
		}
	}

	public checkValidationToken(): void {
		if (this.tokenForm.invalid || this.tokenForm.disabled)
			return;

		const token1 = this.tokenForm.value["token1"],
			token2 = this.tokenForm.value["token2"],
			token3 = this.tokenForm.value["token3"],
			token4 = this.tokenForm.value["token4"],
			token5 = this.tokenForm.value["token5"],
			token6 = this.tokenForm.value["token6"];

		this.tokenForm.disable();

		this.spinners.show('check-code');

		this.tokens.checkToken(
			"".concat(
				token1,
				token2,
				token3,
				token4,
				token5,
				token6
			)
		);
	}

	public alterarSenha(): void {
		if (this.passwordForm.invalid || this.passwordForm.disabled)
			return;

		this.spinners.show('password-recovery');

		this.tokens.setPassword(this.passwordForm.value["password"]);
	}
}
