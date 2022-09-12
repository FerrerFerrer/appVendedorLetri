import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalAceptarPage } from './modal-aceptar.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAceptarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalAceptarPageRoutingModule {}
