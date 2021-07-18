import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[mat-darker]'
})
export class DarkerColorDirective implements OnChanges {

    @Input('mat-darker')
    public isActive: boolean | null = true;

    constructor(
        private element: ElementRef<HTMLElement>
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.isActive.firstChange || changes.isActive.currentValue != changes.isActive.previousValue) {
            if (changes.isActive.currentValue)
                this.element.nativeElement.classList.add('mat-darker');
            else
                this.element.nativeElement.classList.remove('mat-darker');
        }
    }
}
