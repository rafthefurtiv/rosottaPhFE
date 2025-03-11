import { Component, OnInit } from '@angular/core';
import { SlotComponent } from '../slot/slot.component';
import { NgFor } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { ServiziComponent } from '../servizi/servizi.component';
import { AgendaService } from '../agenda.service';
import { HttpClient } from '@angular/common/http';
import { ModaleSlotComponent } from '../modale-slot/modale-slot.component';
import { EventEmitter } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';  
import { DatePipe } from '@angular/common';
import { MessageModule } from 'primeng/message';





@Component({
    selector: 'app-calendario',
    imports: [SlotComponent, NgFor, DividerModule, DatePickerModule, FormsModule, ServiziComponent, ModaleSlotComponent, ToastModule, CommonModule
      ,MessageModule
    ],
    providers: [HttpClient, MessageService, DatePipe],
    templateUrl: './calendario.component.html',
    styleUrl: './calendario.component.scss'
})
export class CalendarioComponent implements OnInit{


  slots : any[] = [];
  date!: Date;
  servizi : any[] = [];
  slotInput: any = {};
  prenotazioneEffettuata = false;
  ricercaEffettuata = false;
  primaRicercaEffettuata = false;
  modalePrenotazioneVisibile = false;
  minDate = new Date();
  maxDate = new Date();
  disabledDays = [];

  constructor(private agendaService: AgendaService, private messageService: MessageService
    ,private datePipe: DatePipe
  ) { }

  ngOnInit() {  


    // chiamata al server per orari disponibili
    this.slots.push({orarioInizio: "10:00", orarioFine: "11:00"});
    this.slots.push({orarioInizio: "10:30", orarioFine: "11:30"});
    this.slots.push({orarioInizio: "11:00", orarioFine: "12:00"});


    this.agendaService.getServizi().subscribe(res => {
      this.servizi = res;
    });

    this.agendaService.getConfig().subscribe((res: any[]) => {
      let monthToAdd = this.agendaService.getConfigIntByCod(res, 'MAXMONTHADD');
      let nextMonth = this.minDate.getMonth()+monthToAdd;
      this.maxDate.setMonth(nextMonth);
    });

  }

  ricerca(){
    this.primaRicercaEffettuata = true;
    this.prenotazioneEffettuata = false;
    let durata = this.calcolaDurata();
    if(this.date != null && this.date != undefined
      && durata > 0
    ){
      let dataScelta = this.formattaData(this.date);
      if(dataScelta){
        this.agendaService.getSlotDisponibili(dataScelta, durata).subscribe(res => {
          this.ricercaEffettuata = true;
          this.slots = res;
        });
      }

    }
    else{
      this.messageService.add({ severity: 'error', summary: 'Dati mancanti', detail: 'Selezionare data e servizio richiesto', life: 3000 });
    }
  }


  calcolaDurata(){
    let conteggio = 0;
    this.servizi.forEach(serv => {
      serv.selected? conteggio += serv.durata : null;
    })
    return conteggio;
  }

  calcolaTitolo(){
    let title="";
    let primo = true;
    this.servizi.forEach(serv => {

      if(serv.selected){
        if(primo){
          title += serv.titolo;
        }
        else{
          title += " - " + serv.titolo;
        }
        
      }
      
    })
    return title;
  }



  mostraModale(slot:any){
    this.slotInput = slot;
    this.modalePrenotazioneVisibile = true;
  }

  formattaData(data: Date){
    return this.datePipe.transform(data, 'yyyy-MM-dd');
  }


  prenota(res:any){
    res.orarioInizio = this.slotInput.orarioInizio;
    res.orarioFine = this.slotInput.orarioFine;

    res.titolo = this.calcolaTitolo();
    res.date = this.formattaData(this.date);

    this.agendaService.addSlot(res).subscribe(res2 => {
      this.modalePrenotazioneVisibile = false;
      this.prenotazioneEffettuata = true;
      this.ricercaEffettuata = false;
      this.messageService.add({ severity: 'success', summary: 'OK', detail: 'Prenotazione effettuata', life: 3000 });

    });
    
  }

  erroreModale(){
    this.messageService.add({ severity: 'error', summary: 'Dati mancanti', detail: 'Inserire i dati obbligatori per proseguire', life: 3000 });
  }

  ricarica(){
    this.slots = [];
    this.prenotazioneEffettuata = false;
    let durata = this.calcolaDurata();
    if(this.date != null && this.date != undefined
      && durata > 0 && this.primaRicercaEffettuata
    ){
      this.ricerca();
    }
    
  }

}
