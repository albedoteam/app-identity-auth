import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Http401Component } from './views/http-401/http-401.component';

const routes: Routes = [
	{
		path: "401",
		component: Http401Component
	}
];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ErrorRoutingModule { }
