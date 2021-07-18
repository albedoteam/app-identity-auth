import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/services/loading.service';
import { LoadingEnum } from 'src/services/models/loading.enum';
import { SessionService } from 'src/services/session.service';
import { TokenService } from '../../token.service';

@Component({
    selector: 'app-first-access',
    templateUrl: './first-access.component.html',
    styleUrls: ['./first-access.component.scss']
})
export class FirstAccessComponent implements OnInit, AfterViewInit, OnChanges {

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

    public loading_load$ = this.loadings.loadingAsync(LoadingEnum.token_load);
    public loading_get$ = this.loadings.loadingAsync(LoadingEnum.token_get_token);
    public loading_change_password$ = this.loadings.loadingAsync(LoadingEnum.token_set_password);

    public tokenForm!: FormGroup;
    public passwordForm!: FormGroup;

    public tokenValidated: boolean = false;

    public pageTitle: string = '';

    private validatedSubscription!: Subscription;
    private loadingLoadSubscription!: Subscription;
    private loadingGetSubscription!: Subscription;
    private loadingChangeSubscription!: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private loadings: LoadingService,
        public title: Title,
        private tokens: TokenService,
        private sessions: SessionService,
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
    }

    ngAfterViewInit(): void {
        this.validatedSubscription = this.tokens.tokenValidatedAsync().subscribe(
            validated => {
                if (validated) {
                    if (!this.tokenForm.disabled)
                        this.tokenForm.disable();

                    if (this.passwordForm.disabled)
                        this.passwordForm.enable();
                }
                else {
                    if (this.tokenForm.disabled)
                        this.tokenForm.enable();

                    if (!this.passwordForm.disabled)
                        this.passwordForm.disable();
                }
            }
        );

        this.token1.nativeElement.focus();
    }

    ngOnInit(): void {
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

            return;
        }

        this.tokens.loadAccount();

        this.tokenForm.controls['token1'].valueChanges.subscribe(
            (value: string) => {
                if (value != '') {
                    this.checkValidationToken();
                    this.token2.nativeElement.focus();
                    this.token2.nativeElement.select();
                }
            }
        );

        this.tokenForm.controls['token2'].valueChanges.subscribe(
            (value: string) => {
                if (value != '') {
                    this.checkValidationToken();
                    this.token3.nativeElement.focus();
                    this.token3.nativeElement.select();
                }
            }
        );

        this.tokenForm.controls['token3'].valueChanges.subscribe(
            (value: string) => {
                if (value != '') {
                    this.checkValidationToken();
                    this.token4.nativeElement.focus();
                    this.token4.nativeElement.select();
                }
            }
        );

        this.tokenForm.controls['token4'].valueChanges.subscribe(
            (value: string) => {
                if (value != '') {
                    this.checkValidationToken();
                    this.token5.nativeElement.focus();
                    this.token5.nativeElement.select();
                }
            }
        );

        this.tokenForm.controls['token5'].valueChanges.subscribe(
            (value: string) => {
                if (value != '') {
                    this.checkValidationToken();
                    this.token6.nativeElement.focus();
                    this.token6.nativeElement.select();
                }
            }
        );

        this.tokenForm.controls['token6'].valueChanges.subscribe(
            (value: string) => {
                if (value != '') {
                    this.checkValidationToken();
                    this.token1.nativeElement.focus();
                    this.token1.nativeElement.select();
                }
            }
        );

        this.sessions.accountNameAsync().subscribe(
            accountName => {
                if (accountName)
                    this.title.setTitle(`${accountName} - Primeiro acesso`);
            }
        );
    }

    private confirmPassword(confirmationControl: FormControl): ValidationErrors | null {
        var parent = confirmationControl.parent! as FormGroup;

        if (!parent) return null;

        if (confirmationControl.value == parent.value["password"]!.value) {
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

        this.tokens.checkToken(
            "".concat(
                this.tokenForm.value["token1"],
                this.tokenForm.value["token2"],
                this.tokenForm.value["token3"],
                this.tokenForm.value["token4"],
                this.tokenForm.value["token5"],
                this.tokenForm.value["token6"]
            )
        );
    }

    public alterarSenha(): void {
        if (this.passwordForm.invalid)
            return;

        this.tokens.setPassword(this.passwordForm.value["password"]);
    }
}
