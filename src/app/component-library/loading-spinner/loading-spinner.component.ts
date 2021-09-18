import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DarkModeService } from 'src/services/dark-mode.service';

@Component({
	selector: 'at-loading-spinner',
	templateUrl: './loading-spinner.component.html',
	styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {

	@Input("name")
	public name!: string;

	@Input("fullscreen")
	public fullscreen!: boolean;

	@Input("text")
	public text!: string;

	public isDarkMode$!: Observable<boolean>;

	constructor(
		private darkModeService: DarkModeService
	) {
		if (this.fullscreen == undefined)
			this.fullscreen = false;
	}

	ngOnInit() {
		this.isDarkMode$ = this.darkModeService.isDarkMode$;
	}

}
