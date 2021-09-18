import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SessionService } from 'src/services/session.service';

@Component({
	selector: 'at-http-401',
	templateUrl: './http-401.component.html',
	styleUrls: ['./http-401.component.scss']
})
export class Http401Component implements OnInit {

	constructor(
		private title: Title,
		private sessions: SessionService,
	) {

	}

	ngOnInit(): void {
		this.sessions.accountNameAsync().subscribe(
			accountName => {
				if (accountName)
					this.title.setTitle(`${accountName} - Não autorizado`);
				else
					this.title.setTitle(`Não autorizado`);
			}
		);
	}
}
