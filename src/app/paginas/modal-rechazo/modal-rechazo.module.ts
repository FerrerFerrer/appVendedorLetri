import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalRechazoPageRoutingModule } from './modal-rechazo-routing.module';

import { ModalRechazoPage } from './modal-rechazo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalRechazoPageRoutingModule
  ],
  declarations: [ModalRechazoPage]
})
export class ModalRechazoPageModule {}
