import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { LoadingService } from 'src/services/loading.service';
import { LoadingEnum } from 'src/services/models/loading.enum';
import { SessionService } from 'src/services/session.service';
import { TokenService } from '../../token.service';

@Component({
  selector: 'app-first-access',
  templateUrl: './first-access.component.html',
  styleUrls: ['./first-access.component.scss']
})
export class FirstAccessComponent implements OnInit {

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
    private loadings: LoadingService,
    public title: Title,
    private tokens: TokenService,
    private sessions: SessionService,
  ) {
    this.tokenForm = new FormGroup({
      token1: new FormControl('', [Validators.required]),
      token2: new FormControl('', [Validators.required]),
      token3: new FormControl('', [Validators.required]),
      token4: new FormControl('', [Validators.required]),
      token5: new FormControl('', [Validators.required]),
      token6: new FormControl('', [Validators.required]),
    });

    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      confirmation: new FormControl('', [Validators.required, this.confirmPassword])
    });
  }

  ngOnInit(): void {
    this.sessions.accountNameAsync().subscribe(
      accountName => {
        if (accountName)
          this.title.setTitle(`${accountName} - Primeiro acesso`);
      }
    );

    this.validatedSubscription = this.tokens.tokenValidatedAsync().subscribe(
      validated => {
        this.tokenValidated = validated;

        if (validated) {
          this.tokenForm.disable()
          this.passwordForm.enable();
        }
        else {

          this.tokenForm.enable();
          this.passwordForm.disable();
        }
      }
    );

    this.loadingLoadSubscription = this.loading_load$.subscribe(
      loading => {
        if (loading) {
          this.tokenForm.disable();
          this.passwordForm.disable();
        }
        else {
          if (this.tokenValidated) {
            this.tokenForm.disable();
            this.passwordForm.enable();
          }
          else {
            this.tokenForm.enable();
            this.passwordForm.disable();
          }
        }
      }
    );

    this.loadingGetSubscription = this.loading_get$.subscribe(
      loading => {
        if (loading) {
          this.tokenForm.disable();
          this.passwordForm.disable();
        }
        else {
          if (this.tokenValidated) {
            this.tokenForm.disable();
            this.passwordForm.enable();
          }
          else {
            this.tokenForm.enable();
            this.passwordForm.disable();
          }
        }
      }
    );

    this.loadingChangeSubscription = this.loading_change_password$.subscribe(
      loading => {
        if (loading) {
          this.tokenForm.disable();
          this.passwordForm.disable();
        }
        else {
          if (this.tokenValidated) {
            this.tokenForm.disable();
            this.passwordForm.enable();
          }
          else {
            this.tokenForm.enable();
            this.passwordForm.disable();
          }
        }
      }
    );
  }

  private confirmPassword(confirmationControl: FormControl): ValidationErrors | null {
    var parent = confirmationControl.parent!;

    if (!parent) return null;

    if (confirmationControl.value == parent.get("password")!.value) {
      confirmationControl.setErrors(null);
      return null;
    }
    else {
      return { not_match: true };
    }
  }

  public checkValidationToken(): void {
    if (this.tokenForm.invalid)
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

    this.tokens.setPassword(this.passwordForm.controls["password"].value);
  }
}
