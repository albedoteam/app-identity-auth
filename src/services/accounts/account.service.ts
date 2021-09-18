import { Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from '../base/base.service';
import { AccountModel } from './models/account.model';

@Injectable({
	providedIn: 'root'
})
export class AccountService extends BaseService<AccountModel> {

	constructor(
		private injector: Injector
	) {
		super(
			environment.accounts,
			injector
		);
	}
}
