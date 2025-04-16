import { Component, OnInit } from '@angular/core';
import { DatePickerModule } from 'primeng/datepicker';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AgendaService } from '../agenda.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SliderModule } from 'primeng/slider';
import { ButtonModule } from 'primeng/button';
import { NgFor } from '@angular/common';
import { ChipModule } from 'primeng/chip';
import { PopoverModule } from 'primeng/popover';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';  
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TabsModule } from 'primeng/tabs';
import { SelectButtonModule } from 'primeng/selectbutton';






@Component({
  selector: 'app-configurazione',
  imports: [DatePickerModule, ToastModule, FormsModule, ToggleSwitchModule, SliderModule, ButtonModule, NgFor, ChipModule, PopoverModule
    ,CommonModule, ToggleButtonModule, TabsModule, SelectButtonModule
  ],
  providers: [MessageService, DatePipe],
  templateUrl: './configurazione.component.html',
  styleUrl: './configurazione.component.scss'
})
export class ConfigurazioneComponent implements OnInit{

  date: Date = new Date();
  dateWithTurni: Date[] = [];
  dateWithTurniDto  : Date[] = [];
  minDate = new Date();
  checked = false;
  orario : any = {};
  orarioGiorno : any = {};
  //turniGiorni : any = [] // lista di giorni. Ogni giorno liste di turni.
  turniModel : any = {};
  turniGiornoModel : any = {turni:[]};
  richieste : any[] = [];
  giorniSettimana : any[] = [];
  giornoScelto = "LUN";
  stateOptions: any[] = [];
  modalita = "ROUTINE";

  constructor(private agendaService: AgendaService, private messageService: MessageService
    ,private datePipe: DatePipe
  ) { 

    this.ricaricaDatiPagina();

  }

  ngOnInit() {  
    //this.orario.orarioInizio = this.datePipe.transform(data, 'yyyy-MM-dd');
    //this.turniModel = ({data: '2025-02-06', turni : [{orarioInizio: '10:00', orarioFine: '11:00'}, {orarioInizio: '11:00', orarioFine: '11:30'}]});
  

  }

  ricaricaDatiPagina(){
    this.richieste = [];
    this.richieste.push(this.agendaService.getDateConTurni());
    this.richieste.push(this.agendaService.getTurniByData(this.agendaService.formattaData(this.date, this.datePipe)));
    this.richieste.push(this.agendaService.getConfig());
    this.richieste.push(this.agendaService.getSettimana());
    //this.richieste.push(this.agendaService.getTurniGiorni());

    this.stateOptions = [
      { label: 'ROUTINE', value: 'ROUTINE' },
      { label: 'EVENT', value: 'EVENT' }
    ];


    forkJoin(this.richieste).subscribe((res:any) => {
      console.log(res);
      this.dateWithTurni = res[0];
      this.dateWithTurni.forEach(
        (d, index) => this.dateWithTurni[index] = new Date(d)
      );
      this.dateWithTurniDto= [...this.dateWithTurni];
      this.turniModel = this.date;
      this.turniModel.turni = res[1];
      this.turniModel.turni.forEach((turno:any) => {
        turno.orarioInizio = turno.orarioInizio.substring(0, 2) + turno.orarioInizio.substring(2, 5);
        turno.orarioFine = turno.orarioFine.substring(0, 2) + turno.orarioFine.substring(2, 5);
      });


      // 3
      this.modalita = this.agendaService.getConfigStringByCod(res[2], "MODE")
      //this.checked = this.agendaService.getConfigStringByCod(res[2], "MODE") == "EVENT" ? true : false;

      // 4
      this.giorniSettimana = res[3];
      //this.turniGiornoModel.turni = [];

      this.changeGiornoScelto("LUN");
    });
  }

  salvaTurni(){
    // sul BE elimino tutto e risalvo per non gestire incongruenze.
    this.agendaService.salvaTurniByData(this.turniModel.turni, this.agendaService.formattaData(this.date, this.datePipe)).subscribe(
      res => {
        this.messageService.add({ severity: 'success', summary: 'OK', detail: 'Turni salvati', life: 4000 });
        this.ricaricaDatiPagina();
      }
    );
  }

  salvaMode(){
    const modeObj: any = {};
    modeObj.chiave = "MODE";
    modeObj.stringValue = this.modalita;
    this.agendaService.salvaCongif(modeObj).subscribe(
      res => {
        this.messageService.add({ severity: 'success', summary: 'OK', detail: 'Modalità modificata in ' + modeObj.stringValue, life: 4000 });
        //this.ricaricaDatiPagina();
      }
    );
  }

  salvaTurniGiorni(){
    // sul BE elimino tutto e risalvo per non gestire incongruenze.
    this.agendaService.salvaTurniGiorni(this.giorniSettimana).subscribe(
      res => {
        this.messageService.add({ severity: 'success', summary: 'OK', detail: 'Giorni salvati', life: 4000 });
        this.ricaricaDatiPagina();
      }
    );
  }

  aggiungiTurnoGiorno(){
    if(this.orarioGiorno.orarioInizio && this.orarioGiorno.orarioFine){
      let orarioFormattato = {...this.orarioGiorno}
      orarioFormattato.orarioInizio = this.datePipe.transform(orarioFormattato.orarioInizio, 'HH:mm');
      orarioFormattato.orarioFine = this.datePipe.transform(orarioFormattato.orarioFine, 'HH:mm');
      this.getGiornoByChiave(this.giorniSettimana, this.giornoScelto).turni.push(orarioFormattato);
      this.compattaTurni(this.getGiornoByChiave(this.giorniSettimana, this.giornoScelto));
    }
    //this.getGiornoByChiave(this.giorniSettimana, this.giornoScelto).turni = {...this.turniGiornoModel};
  }

  aggiungiTurno(){
    // aggiungi un turno per data e orari
    if(this.date && this.orario.orarioInizio && this.orario.orarioFine){
      let orarioFormattato = {...this.orario}
      orarioFormattato.orarioInizio = this.datePipe.transform(orarioFormattato.orarioInizio, 'HH:mm');
      orarioFormattato.orarioFine = this.datePipe.transform(orarioFormattato.orarioFine, 'HH:mm');
      this.turniModel.turni.push(orarioFormattato);
      this.compattaTurni(this.turniModel);
    }


  }

  eliminaTurno(turno:any, turniModel: any){
    turniModel.turni = turniModel.turni.filter((item: any) => item !== turno);
  }
  eliminaTurniGiorno(){
  }
  eliminaTurniMese(){
  }

  eliminaTurniAnno(){
  }

  cercaTurni(){
    // cerco i turni con chiamata a BE
    this.ricaricaDatiPagina();
  }


  compattaTurni(turniModel: any){
    let orarioInizioTemp = null;
    let orarioFineTemp : any = null;
    let ridotto = true;
    while(ridotto){
      ridotto = false;

      turniModel.turni.forEach((turno:any) => {
        orarioFineTemp = turno.orarioFine;
        turniModel.turni.forEach((turno2:any) => {
          if(orarioFineTemp == turno2.orarioInizio && !ridotto){
            turno.orarioFine = turno2.orarioFine;
            ridotto = true;
            this.eliminaTurno(turno2, turniModel);
          }
          
        });
      });
    }

    let turnoInternoEliminato = true;
    while(turnoInternoEliminato){
      turnoInternoEliminato = false;
      let i=0;
      let j=0;

      turniModel.turni.forEach((turno:any) => {
        i++;
        j=0;
        turniModel.turni.forEach((turno2:any) => {
          j++;
          if((turno.orarioInizio <= turno2.orarioInizio
            && turno.orarioFine >= turno2.orarioFine) && !turnoInternoEliminato
            && i != j
          ){
            turnoInternoEliminato = true;
            this.eliminaTurno(turno2, turniModel);
          }
          
        });
      });
    }

  }

  disabilitaSelezione(){
    this.dateWithTurniDto = [...this.dateWithTurni];
  }

  changeGiornoScelto(giorno:string){
    this.giornoScelto = giorno;
    this.turniGiornoModel = this.getGiornoByChiave(this.giorniSettimana, giorno);
  }

  getGiornoByChiave(giorniList:any, chiave:string){
    let giorno = giorniList.filter((g:any) => {return g.giorno.giorno == chiave})[0];
    if(giorno){
      return giorno;
    }
    return {}
  }

  test(){
    console.log("test");
  }

  

}
