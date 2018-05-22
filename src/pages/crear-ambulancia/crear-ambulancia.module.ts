import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrearAmbulanciaPage } from './crear-ambulancia';

@NgModule({
  declarations: [
    CrearAmbulanciaPage,
  ],
  imports: [
    IonicPageModule.forChild(CrearAmbulanciaPage),
  ],
})
export class CrearAmbulanciaPageModule {}
