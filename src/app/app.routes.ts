import { Routes } from '@angular/router';
import { CalendarioComponent } from './calendario/calendario.component';
import { ListaSlotComponent } from './lista-slot/lista-slot.component';
import { ConfigurazioneComponent } from './configurazione/configurazione.component';

export const routes: Routes = [
    {path: 'calendario', component: CalendarioComponent}
    ,{path: 'lista-slot', component: ListaSlotComponent}
    ,{path: 'configurazione', component: ConfigurazioneComponent}
];
