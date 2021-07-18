import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Http401Component } from './views/http-401/http-401.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [Http401Component]
})
export class ErrorModule { }
