import { Component, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AgendaService } from '../agenda.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-slot-lettura',
  imports: [ButtonModule, CardModule],
  templateUrl: './slot-lettura.component.html',
  styleUrl: './slot-lettura.component.scss'
})
export class SlotLetturaComponent {

  @Input() slotInput : any = {};
  @Output() eliminaSlotEvent: EventEmitter<any> = new EventEmitter<any>();
  

  constructor(private agendaService: AgendaService
  ) { }

  elimina(){
    this.agendaService.deleteSlot(this.slotInput).subscribe(res => this.eliminaSlotEvent.emit());
  }

}
