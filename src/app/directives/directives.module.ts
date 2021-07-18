import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkerColorDirective } from './darker-color/darker-color.directive';
import { LighterDirective } from './lighter-color/lighter.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DarkerColorDirective,
        LighterDirective
    ],
    exports: [
        DarkerColorDirective,
        LighterDirective
    ]
})
export class DirectivesModule { }
