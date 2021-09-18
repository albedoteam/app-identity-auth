import { Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from '../base/base.service';
import { AuthServerModel } from './models/auth-server.model';

@Injectable({
	providedIn: 'root'
})
export class AuthServerService extends BaseService<AuthServerModel> {

	constructor(
		private injector: Injector
	) {
		super(
			environment.authServer,
			injector
		);
	}
}
