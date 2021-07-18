import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SessionService } from 'src/services/session.service';
import { CallbackService } from './callback.service';

@Component({
    selector: 'app-callback',
    templateUrl: './callback.component.html',
    styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

    constructor(
        private title: Title,
        private sessions: SessionService,
        private callbacks: CallbackService
    ) {
    }

    ngOnInit() {
        this.sessions.accountNameAsync().subscribe(
            accountName => {
                if (accountName)
                    this.title.setTitle(`${accountName} - Validação de autenticação`);
            }
        );

        this.callbacks.loadAccount();
    }
}
