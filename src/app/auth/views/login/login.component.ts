import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { DarkModeService } from 'src/services/dark-mode.service';
import { SessionService } from 'src/services/session.service';

@Component({
    selector: 'at-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public darkMode$!: Observable<boolean>;

    constructor(
        private darkerMode: DarkModeService,
        private title: Title,
        private sessions: SessionService,
    ) {

    }

    ngOnInit(): void {
        this.darkMode$ = this.darkerMode.isDarkMode$.asObservable();

        this.sessions.accountNameAsync().subscribe(
            accountName => {
                if (accountName)
                    this.title.setTitle(`${accountName} - Login`);
            }
        );
    }
}
