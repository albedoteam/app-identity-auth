import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { LoadingService } from 'src/services/loading.service';

@Component({
  selector: 'at-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {


  public loading$: Observable<boolean>;
  public authForm: FormGroup;

  private loadingSubscription!: Subscription;

  constructor(
    private loadings: LoadingService,
    private authService: AuthService,
  ) {

    this.loading$ = this.loadings.loadingAsync('auth');

    this.authForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
    });
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  ngOnInit() {
    this.loadingSubscription = this.loading$.subscribe(
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
