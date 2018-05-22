import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SemaforoPage } from './semaforo';

@NgModule({
  declarations: [
    SemaforoPage,
  ],
  imports: [
    IonicPageModule.forChild(SemaforoPage),
  ],
})
export class SemaforoPageModule {}
