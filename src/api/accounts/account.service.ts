import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountModel } from './models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountId: BehaviorSubject<string | null>;
  private accountIdSubs: Subscription;
  private account: BehaviorSubject<AccountModel | null>;

  constructor(
    private http: HttpClient
  ) {
    var storedAccount = localStorage.getItem('account_albedo');
    if (storedAccount == null)
      this.accountId = new BehaviorSubject<string | null>('');
    else
      this.accountId = new BehaviorSubject<string | null>(storedAccount);

    this.account = new BehaviorSubject<AccountModel | null>(null);

    this.accountIdSubs = this.accountIdAsync().subscribe(id => {
      if (id)
        localStorage.setItem('account_albedo', id as string);
    });
  }

  public accountAsync = (): Observable<AccountModel | null> => this.account.asObservable();

  public accountIdAsync = (): Observable<string | null> => this.accountId.asObservable();

  public setAccount(account: string): void {
    this.accountId.next(account);
    this.requestAccount(account);
  }

  public requestAccount(accountId: string): void {
    this.http.get<AccountModel>(
      `${environment.accounts}/Account/${accountId}`
    ).subscribe(
      account => {
        if (account)
          this.account.next(account);
      }
    );
  }
}
