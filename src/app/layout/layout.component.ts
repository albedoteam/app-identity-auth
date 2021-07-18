import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DarkModeService } from 'src/services/dark-mode.service';
import { AuthService } from '../auth/auth.service';
import { LayoutService } from './layout.service';

@Component({
    selector: 'at-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {

    public isDarkMode$!: Observable<boolean>;

    public accountName: string;

    get barColor(): string {
        return location.pathname.includes('error') ? 'warn' : 'primary';
    }

    constructor(
        private auths: AuthService,
        private darkModeService: DarkModeService,
        private layout: LayoutService
    ) {
        this.accountName = '';
    }

    public ngOnInit(): void {
        this.isDarkMode$ = this.darkModeService.isDarkMode$.asObservable();

        this.auths.loadAccount();

        this.layout.accountName$.subscribe(
            account => {
                if (account)
                    this.accountName = account
            }
        );
    }

    public switchThemeMode(): void {
        this.darkModeService.toggle();
    }
}
