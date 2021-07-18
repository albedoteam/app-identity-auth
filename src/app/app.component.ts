import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subscription } from 'rxjs';
import { DarkModeService } from 'src/services/dark-mode.service';
import { IdentityService } from 'src/services/identity.service';

@Component({
    selector: 'at-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public isDarkMode$!: Observable<boolean>;
    public loaded$!: Observable<'loading' | 'not-loaded' | 'loaded'>;

    constructor(
        private darkModeService: DarkModeService,
        private spinners: NgxSpinnerService,
        private identities: IdentityService,
    ) {

    }

    private loadedSubscription!: Subscription;
    private darkModeSubscription!: Subscription;

    public ngOnInit(): void {
        this.spinners.show('layout-spinner');

        this.isDarkMode$ = this.darkModeService.isDarkMode$;

        this.darkModeSubscription = this.isDarkMode$.subscribe(
            darkMode => {
                if (darkMode)
                    document.body.classList.add('dark');
                else
                    document.body.classList.remove('dark');
            }
        );

        this.loaded$ = this.identities.loaded$;

        this.loadedSubscription = this.identities.loaded$.subscribe(
            loadStatus => {
                if (loadStatus == 'loaded') {
                    this.spinners.hide('layout-spinner');
                }
                else if (loadStatus == 'not-loaded') {
                    this.spinners.hide('layout-spinner');
                }
            }
        );
    }
}
