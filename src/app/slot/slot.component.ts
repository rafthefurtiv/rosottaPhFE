import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';


@Component({
    selector: 'app-slot',
    imports: [ButtonModule, CardModule],
    templateUrl: './slot.component.html',
    styleUrl: './slot.component.scss'
})
export class SlotComponent {

  @Input() orarioInizio: string = "";
  @Input() orarioFine: string = "";
  @Output() prenotaEvent: EventEmitter<any> = new EventEmitter<any>();

  //orarioInizio = "10:00";

  prenota(){
    this.prenotaEvent.emit({orarioInizio: this.orarioInizio, orarioFine: this.orarioFine});
  }

}
