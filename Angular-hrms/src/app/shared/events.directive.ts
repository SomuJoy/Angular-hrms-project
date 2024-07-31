import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appEvents]'
})
export class EventsDirective {

  @Output() myClick = new EventEmitter<string>();

  constructor() { }

  @HostListener('click', ['$event'])
  handleClick(event: Event){
    this.myClick.emit('Button Clicked');
  }

}
