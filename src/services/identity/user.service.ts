import { Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from '../base/base.service';
import { ActivateUserModel } from './models/activate-user.model';
import { ChangePasswordModel } from './models/change-password.model';
import { UserModel } from './models/user.model';

@Injectable({
	providedIn: 'root'
})
export class UserService extends BaseService<UserModel> {
	constructor(
		private injector: Injector
	) {
		super(
			environment.users,
			injector
		);
	}

	public setPassword(accountId: string, userId: string, password: string) {
		var setPassword: ChangePasswordModel = {
			accountId: accountId,
			id: userId,
			password: password
		};

		return this.http.patch(
			`${this.baseRoute}/${userId}/setPassword`,
			setPassword
		);
	}

	public activate(accountId: string, userId: string) {
		var activateUser: ActivateUserModel = {
			accountId: accountId,
			id: userId,
			reason: "First access"
		};

		return this.http.patch(
			`${this.baseRoute}/${userId}/activate`,
			activateUser
		);
	}
}
