import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
})
export class FacturaPage extends ApiService {

  solicitud: any;

  facturaJSON = {
    id_solicitud: '',
    factura: '',
    monto: '',
    respuesta: '',
    folio: null
  }

  constructor(private modalController: ModalController, private navParams: NavParams,
    private _apiService: ApiService) {
      super();
  }

  ngOnInit() {
    this.solicitud = this.navParams.get('datos_orden');
    this.facturaJSON.id_solicitud = this.solicitud.id_cliente;
    console.log(this.solicitud)
  }

  cerrar() {
    this.modalController.dismiss();
  }

  logForm(){
    this.montoFactura();
    this.cerrar();
  }

  async montoFactura(){
    let url = this._apiuri + "api/facturar/" + this.facturaJSON.id_solicitud +"/"+ this.facturaJSON.factura +"/" + this.facturaJSON.monto;
    // let url = "http://192.168.88.153:8000/letrimex_v2/public/api/facturar/" + this.facturaJSON.id_solicitud +"/"+ this.facturaJSON.factura +"/" + this.facturaJSON.monto;

    const response2 = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    console.log('Status de facturacion', response2.status);
  }

}
