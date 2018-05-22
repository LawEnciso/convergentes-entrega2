import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AmbulanciasPage } from './ambulancias';

@NgModule({
  declarations: [
    AmbulanciasPage,
  ],
  imports: [
    IonicPageModule.forChild(AmbulanciasPage),
  ],
})
export class AmbulanciasPageModule {}
