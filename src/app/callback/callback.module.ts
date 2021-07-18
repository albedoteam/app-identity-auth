import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallbackComponent } from './callback.component';
import { CallbackRoutingModule } from './callback.routing.module';
import { ComponentLibraryModule } from '../component-library/component-library.module';

@NgModule({
    imports: [
        CommonModule,
        CallbackRoutingModule,
        ComponentLibraryModule,
    ],
    declarations: [CallbackComponent],
})
export class CallbackModule { }
