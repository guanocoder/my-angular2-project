import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[dropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') private isOpen = false;

  @HostListener('click') onclick(eventData: Event) {
    this.isOpen = !this.isOpen;
  }

}
