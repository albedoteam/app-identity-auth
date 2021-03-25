import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseService } from '../base/base.service';
import { PasswordRecoveryModel } from './models/password-recovery.model';

@Injectable({
  providedIn: 'root'
})
export class PasswordRecoveryService extends BaseService<PasswordRecoveryModel> {
  constructor(
    private injector: Injector
  ) {
    super(
      environment.tokens,
      injector
    )
  }

  public get(accountId: string, token: string): Observable<PasswordRecoveryModel> {
    return this.http.get<PasswordRecoveryModel>(
      `${this.baseRoute}?accountId=${accountId}&validationToken=${token}`
    );
  }
}
