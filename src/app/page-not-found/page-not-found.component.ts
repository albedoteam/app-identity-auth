import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IdentityService } from 'src/services/identity.service';
import { SessionService } from 'src/services/session.service';

@Component({
    selector: 'at-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

    constructor(
        private identities: IdentityService,
        private title: Title,
        private sessions: SessionService,
    ) {

    }

    ngOnInit(): void {
        this.identities.loaded$.next('not-loaded');

        this.sessions.accountNameAsync().subscribe(
            accountName => {
                if (accountName)
                    this.title.setTitle(`${accountName} - Não encontrado`);
                else
                    this.title.setTitle(`Não encontrado`);
            }
        );
    }
}
