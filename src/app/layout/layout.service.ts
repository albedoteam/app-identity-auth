import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/services/accounts/account.service';
import { AccountModel } from 'src/services/accounts/models/account.model';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(
    private accounts: AccountService
  ) {

  }

  public AccountAsync = (): Observable<AccountModel | null> => this.accounts.accountAsync();
}
