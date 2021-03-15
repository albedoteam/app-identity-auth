import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OktaAuth } from "@okta/okta-auth-js"
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'at-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public authForm: FormGroup;

  constructor(
    private oAuthService: OAuthService,
    private changeDetector: ChangeDetectorRef,
  ) {
    this.authForm = new FormGroup({
      username: new FormControl('eryckson@albedo', [Validators.required, Validators.email]),
      password: new FormControl('m@monas12', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
    });
  }

  ngOnInit() {

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.authForm.controls[controlName].hasError(errorName);
  }

  public login = ($event: Event): void => {
    $event.preventDefault();
    this.oAuthService.createAndSaveNonce().then(
      nonce => {
        const authClient = new OktaAuth({
          clientId: "0oa5dfhs0PSqvAMdx5d6",
          authorizeUrl: `https://dev-83792757.okta.com/oauth2/default/v1/authorize`,
          tokenUrl: `https://dev-83792757.okta.com/oauth2/default/v1/token`,
          issuer: 'https://dev-83792757.okta.com/oauth2/default',
        });
        return authClient.signInWithCredentials({
          username: this.authForm.controls["username"].value,
          password: this.authForm.controls["password"].value,
        }).then((response) => {
          if (response.status === 'SUCCESS') {
            return authClient.token.getWithoutPrompt({
              clientId: "0oa5dfhs0PSqvAMdx5d6",
              responseType: ['id_token', 'token', 'refresh_token'],
              scopes: ['openid', 'profile', 'email'],
              sessionToken: response.sessionToken,
              nonce: nonce,
              redirectUri: window.location.origin + '/callback'
            })
              .then((responseTokens) => {
                console.log(responseTokens);
                const idToken = responseTokens.tokens.idToken?.idToken;
                const accessToken = responseTokens.tokens.accessToken?.accessToken;
                const refreshToken = responseTokens.tokens.refreshToken?.refreshToken;
                const keyValuePair = `id_token=${encodeURIComponent(idToken!)}&access_token=${encodeURIComponent(accessToken!)}&refresh_token=${encodeURIComponent(refreshToken!)}`;
                this.oAuthService.tryLogin({
                  customHashFragment: keyValuePair,
                  disableOAuth2StateCheck: true,
                }).then(() => {
                  location.href = `http://localhost:4201/#${keyValuePair}`;
                });
              });
          } else {
            throw new Error('We cannot handle the ' + response.status + ' status');
          }
        }).catch((error) => {
          console.error(error);
        });
      });
  }
}
