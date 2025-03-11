import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { SlotComponent } from '../slot/slot.component';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';  
import { AgendaService } from '../agenda.service';
import { DatePipe } from '@angular/common';
import { SlotLetturaComponent } from '../slot-lettura/slot-lettura.component';




@Component({
  selector: 'app-lista-slot',
  imports: [DividerModule, DatePickerModule, FormsModule, ButtonModule, CommonModule, SlotLetturaComponent],
  providers: [DatePipe],
  templateUrl: './lista-slot.component.html',
  styleUrl: './lista-slot.component.scss'
})
export class ListaSlotComponent {
  
  slots : any[] = [];
  date!: Date;

  constructor(private agendaService: AgendaService, private datePipe: DatePipe
  ) { }


  carica(){
    let dataScelta = this.formattaData(this.date);
    if(dataScelta){
      this.agendaService.getSlot(dataScelta).subscribe(res => {
        this.slots = res;
      });
    }

  }

  formattaData(data: Date){
    return this.datePipe.transform(data, 'yyyy-MM-dd');
  }




}
