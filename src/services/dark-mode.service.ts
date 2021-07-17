import { MediaMatcher } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DarkModeService {
    public isDarkMode$!: BehaviorSubject<boolean>;

    constructor(
        private mediaMatcher: MediaMatcher
    ) {

        let darkModeOn: string | null = localStorage.getItem('dark-mode');

        const isDarkMode = darkModeOn == null ? this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)').matches : darkModeOn == 'y';

        this.isDarkMode$ = new BehaviorSubject<boolean>(isDarkMode);
    }

    public toggle(): void {
        localStorage.setItem('dark-mode', !this.isDarkMode$.getValue() ? 'y' : 'n');
        this.isDarkMode$.next(!this.isDarkMode$.getValue());
    }
}
