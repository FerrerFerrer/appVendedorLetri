import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAceptarPageRoutingModule } from './modal-aceptar-routing.module';

import { ModalAceptarPage } from './modal-aceptar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAceptarPageRoutingModule
  ],
  declarations: [ModalAceptarPage]
})
export class ModalAceptarPageModule {}
