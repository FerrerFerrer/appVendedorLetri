import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FacturaPageModule } from '../paginas/factura/factura.module';
import { FacturaPage } from '../paginas/factura/factura.page';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page extends ApiService{

  id_vendedor = localStorage.getItem('id_vendedor');
  res: any;
  constructor(private modalController: ModalController) {
    super();
  }

  async ngOnInit() {
    const url = this._apiuri + "api/ordenes_vendedor/" + this.id_vendedor;

    let data = {
      method : "GET",
      headers: {"Content-type": "application/json"}
    }

    const req = await fetch(url, data);
    this.res = await req.json();
    console.log(this.res);
  }

  async abrirFactura(soli){
    const modal = await this.modalController.create({
      component: FacturaPage,
      componentProps: {
        datos_orden: soli,
        FacturaPageModule
      }
    });
    await modal.present();
  }

  refrescar() {
    this.ngOnInit();
  }
}
