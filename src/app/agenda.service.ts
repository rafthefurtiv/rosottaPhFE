import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private apiUrlBase = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  formattaData(data: Date, dataPipe: any){
    return dataPipe.transform(data, 'yyyy-MM-dd');
  }



  getConfigIntByCod(config:any, key:string){
    let configNumber = 0;
    config.forEach((conf:any) => {
      if(conf.chiave == key){
        return configNumber = conf.intValue
      }
    });
    return configNumber;
  }

  getConfigStringByCod(config:any, key:string){
    let configString = "";
    config.forEach((conf:any) => {
      if(conf.chiave == key){
        return configString = conf.stringValue
      }
    });
    return configString;
  }
  


  getServizi(): Observable<any> {
    return this.http.get<any>(this.apiUrlBase+"/servizi");}
  
  addSlot(slot:any): Observable<any> {
    return this.http.post<any>(this.apiUrlBase+"/slot", slot);}

  deleteSlot(slot:any): Observable<any> {
    return this.http.delete<any>(this.apiUrlBase+"/slot/"+slot.id);}

  getSlotDisponibili(dataPrenotazione: string, durata: number): Observable<any> {
    return this.http.get<any>(this.apiUrlBase+"/slot/disponibili"+"?date="+dataPrenotazione+"&durataMinuti="+durata);}

  getSlot(dataPrenotazione: string): Observable<any> {
    return this.http.get<any>(this.apiUrlBase+"/slot"+"?date="+dataPrenotazione);}

  getConfig(): Observable<any> {
    return this.http.get<any>(this.apiUrlBase+"/config");}

  // GESTIONE TURNI

  getDateConTurni(): Observable<any> {
    return this.http.get<any>(this.apiUrlBase+"/turni/date");}

  getTurniByData(dataPrenotazione: Date): Observable<any> {
    return this.http.get<any>(this.apiUrlBase+"/turni"+"?date="+dataPrenotazione);}

  salvaTurniByData(turni:any, dataPrenotazione:Date): Observable<any> {
    return this.http.post<any>(this.apiUrlBase+"/turni"+"?date="+dataPrenotazione, turni);}   

  getTurniGiorni(): Observable<any> {
    return this.http.get<any>(this.apiUrlBase+"/turni/giorni");}

  salvaTurniGiorni(giorni:any[]): Observable<any> {
    return this.http.post<any>(this.apiUrlBase+"/turni/giorni", giorni);} 

  salvaCongif(config:any): Observable<any> {
    return this.http.post<any>(this.apiUrlBase+"/config", config);}   

  getSettimana(): Observable<any> {
    return this.http.get<any>(this.apiUrlBase+"/config/settimana");}

  salvaSettimana(settimana:any): Observable<any> {
    return this.http.post<any>(this.apiUrlBase+"/config/settimana", settimana);}   
}
