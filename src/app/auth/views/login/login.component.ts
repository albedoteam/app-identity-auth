import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/services/session.service';

@Component({
	selector: 'at-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	constructor(
		private title: Title,
		private sessions: SessionService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
	) {

	}

	ngOnInit(): void {
		if (this.activatedRoute.snapshot.queryParamMap.keys.length > 0) {
			this.router.navigate([],
				{
					queryParams: null,
					replaceUrl: true
				});
		}

		this.sessions.accountNameAsync().subscribe(
			accountName => {
				if (accountName)
					this.title.setTitle(`${accountName} - Login`);
			}
		);
	}
}
