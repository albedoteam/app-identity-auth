import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedirectComponent } from './redirect.component';
import { RedirectRoutingModule } from './redirect.routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  imports: [
    CommonModule,
    RedirectRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressBarModule,
  ],
  declarations: [RedirectComponent]
})
export class RedirectModule { }
