import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http401Component } from './views/http-401/http-401.component';
import { ErrorRoutingModule } from './error.routing.module';

@NgModule({
    imports: [
        CommonModule,
        ErrorRoutingModule,
    ],
    declarations: [Http401Component]
})
export class ErrorModule { }
