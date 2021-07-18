import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
    imports: [
        CommonModule,
        NgxSpinnerModule,
    ],
    declarations: [LoadingSpinnerComponent],
    exports: [LoadingSpinnerComponent]
})
export class ComponentLibraryModule { }
