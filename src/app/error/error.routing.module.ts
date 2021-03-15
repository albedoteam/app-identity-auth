import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error.component';
import { Http401Component } from './views/http-401/http-401.component';
import { Http404Component } from './views/http-404/http-404.component';

const routes: Routes = [
  {
    path: "",
    component: ErrorComponent,
    children: [
      {
        path: "",
        redirectTo: "401",
        pathMatch: "full"
      },
      {
        path: "401",
        component: Http401Component
      },
      {
        path: "404",
        component: Http404Component
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorRoutingModule { }