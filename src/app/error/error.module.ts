import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { Http401Component } from './views/http-401/http-401.component';
import { Http404Component } from './views/http-404/http-404.component';
import { ErrorRoutingModule } from './error.routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatCardModule,
    ErrorRoutingModule,
  ],
  declarations: [ErrorComponent, Http401Component, Http404Component]
})
export class ErrorModule { }
