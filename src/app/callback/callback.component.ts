import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { IdentityService } from 'src/services/identity.service';
import { SessionService } from 'src/services/session.service';
import { CallbackService } from './callback.service';

@Component({
    selector: 'app-callback',
    templateUrl: './callback.component.html',
    styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

    constructor(
        private identities: IdentityService,
        private spinners: NgxSpinnerService,
        private title: Title,
        private sessions: SessionService,
        private callbacks: CallbackService
    ) {
    }

    private loadedSubscription!: Subscription;

    ngOnInit() {
        this.sessions.accountNameAsync().subscribe(
            accountName => {
                if (accountName)
                    this.title.setTitle(`${accountName} - Validação de autenticação`);
            }
        );

        this.spinners.show('redirecting');
        this.loadedSubscription = this.identities.loaded$.subscribe(
            loaded => {
                if (loaded == 'loaded') {
                    this.callbacks.validateRedirection();
                }
            }
        );
    }
}
