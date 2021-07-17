import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[mat-lighter]'
})
export class LighterDirective implements OnChanges {

    @Input('mat-lighter')
    public isActive: boolean | null = true;

    constructor(
        private element: ElementRef<HTMLElement>
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.isActive.firstChange || changes.isActive.currentValue != changes.isActive.previousValue) {
            if (changes.isActive.currentValue)
                this.element.nativeElement.classList.add('mat-lighter');
            else
                this.element.nativeElement.classList.remove('mat-lighter');
        }
    }
}
