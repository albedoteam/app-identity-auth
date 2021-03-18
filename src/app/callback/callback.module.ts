import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallbackComponent } from './callback.component';
import { CallbackRoutingModule } from './callback.routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  imports: [
    CommonModule,
    CallbackRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressBarModule,
  ],
  declarations: [CallbackComponent]
})
export class CallbackModule { }
