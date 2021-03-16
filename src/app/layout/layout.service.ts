import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/api/accounts/account.service';
import { AccountModel } from 'src/api/accounts/models/account.model';

@Injectable({
  providedIn: 'any'
})
export class LayoutService {

  constructor(
    private accounts: AccountService
  ) {

  }

  public AccountAsync = (): Observable<AccountModel | null> => this.accounts.accountAsync();
}
