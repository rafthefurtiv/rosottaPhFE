import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgFor } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-servizi',
  imports: [NgFor, ButtonModule, FormsModule],
  templateUrl: './servizi.component.html',
  styleUrl: './servizi.component.scss'
})
export class ServiziComponent implements OnInit{

  @Input() servizi: any[] = [];
  @Input() date!: Date | undefined;
  
  @Output() ricercaEvent : EventEmitter<any> = new EventEmitter<any>();
  @Output() ricaricaEvent : EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {  


    // chiamata al server per orari disponibili
    /*
    this.servizi.push({titolo:"Coppia", durata: 90, selected:true});
    this.servizi.push({titolo:"Carnevale", durata: 30, selected:false});
    this.servizi.push({titolo:"Festa", durata: 60, selected:false});
    */
  }

  ricerca(){

    let conteggio = 0;
    this.servizi.forEach(serv => {
      serv.selected? conteggio += serv.durata : null;
    })

    this.ricercaEvent.emit({});
    
  }

  ricarica(){
    this.ricaricaEvent.emit({});
  }

}
