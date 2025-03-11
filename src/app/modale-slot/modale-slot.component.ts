import { Component, Input, OnInit, Output, Inject, PLATFORM_ID, EventEmitter } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber'; // Importa InputNumberModule
import { isPlatformBrowser } from '@angular/common';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-modale-slot',
  imports: [DialogModule, FormsModule, ButtonModule, InputNumberModule, TextareaModule, ToastModule],
  providers: [MessageService],
  templateUrl: './modale-slot.component.html',
  styleUrl: './modale-slot.component.scss'
})
export class ModaleSlotComponent{

  @Input() visibiles : boolean = false;
  @Input() slotInput : any = false;
  
  @Output() formSlotEvent : EventEmitter<any> = new EventEmitter<any>();
  @Output() formSlotEventError : EventEmitter<any> = new EventEmitter<any>();
  @Output() chiudiDialogEvent : EventEmitter<any> = new EventEmitter<any>();

  slot: any = {};

  constructor(private messageService: MessageService) { }



  salva(){
    if(this.slot.nome != null && this.slot.nome != undefined
      && this.slot.cognome != null && this.slot.cognome != undefined
      && this.slot.telefono != null && this.slot.telefono != undefined){
        this.formSlotEvent.emit(this.slot);
      }
      else{
        this.formSlotEventError.emit(this.slot);
      }
  }

  chiudi(){
    this.chiudiDialogEvent.emit();
  }

}
