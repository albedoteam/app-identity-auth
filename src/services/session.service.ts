import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { StorageEnum } from './models/storage.enum';

@Injectable({
	providedIn: 'root'
})
export class SessionService {

	private storage: Storage = sessionStorage;

	private accountIdSubject: BehaviorSubject<string | null>;
	private accountNameSubject: BehaviorSubject<string | null>;
	private callbackUrlSubject: BehaviorSubject<string | null>;

	private accountIdSubscription!: Subscription;
	private accountNameSubscription!: Subscription;
	private callbackUrlSubscription!: Subscription;

	constructor() {
		this.accountIdSubject = new BehaviorSubject<string | null>(this.storage.getItem(StorageEnum.account_albedo));
		this.accountIdSubscription = this.accountIdSubject.subscribe(
			accountId => {
				if (accountId)
					this.storage.setItem(StorageEnum.account_albedo, accountId);
				else
					this.storage.removeItem(StorageEnum.account_albedo);
			}
		);

		this.accountNameSubject = new BehaviorSubject<string | null>(this.storage.getItem(StorageEnum.account_albedo_name));
		this.accountNameSubscription = this.accountNameSubject.subscribe(
			accountName => {
				if (accountName)
					this.storage.setItem(StorageEnum.account_albedo_name, accountName);
				else
					this.storage.removeItem(StorageEnum.account_albedo_name);
			}
		);

		this.callbackUrlSubject = new BehaviorSubject<string | null>(sessionStorage.getItem(StorageEnum.callback_url));
		this.callbackUrlSubscription = this.callbackUrlSubject.subscribe(
			callbackUrl => {
				if (callbackUrl)
					this.storage.setItem(StorageEnum.callback_url, callbackUrl);
				else
					this.storage.removeItem(StorageEnum.callback_url);
			}
		);
	}

	public accountIdAsync = (): Observable<string | null> => this.accountIdSubject.asObservable();
	public accountNameAsync = (): Observable<string | null> => this.accountNameSubject.asObservable();
	public callbackUrlAsync = (): Observable<string | null> => this.callbackUrlSubject.asObservable();

	public accountId = (): string | null => this.accountIdSubject.getValue();
	public accountName = (): string | null => this.accountNameSubject.getValue();
	public callbackUrl = (): string | null => this.callbackUrlSubject.getValue();

	public setAccountId(account: string | null): void {
		this.accountIdSubject.next(account);
	}

	public setAccountName(accountName: string | null): void {
		this.accountNameSubject.next(accountName);
	}

	public setCallbackUrl(callbackUrl: string | null): void {
		this.callbackUrlSubject.next(callbackUrl);
	}
}
