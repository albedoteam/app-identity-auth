import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallbackComponent } from './callback.component';
import { CallbackRoutingModule } from './callback.routing.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
    imports: [
        CommonModule,
        CallbackRoutingModule,
        MatProgressBarModule,
    ],
    declarations: [CallbackComponent]
})
export class CallbackModule { }
