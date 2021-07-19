import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/services/accounts/account.service';
import { AccountModel } from 'src/services/accounts/models/account.model';
import { SessionService } from 'src/services/session.service';

@Injectable({
	providedIn: 'root'
})
export class LayoutService {

	public accountName$: Observable<string | null>;

	constructor(
		private sessions: SessionService,
	) {
		this.accountName$ = sessions.accountNameAsync();
	}
}
