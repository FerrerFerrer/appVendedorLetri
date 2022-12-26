import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-modal-aceptar',
  templateUrl: './modal-aceptar.page.html',
  styleUrls: ['./modal-aceptar.page.scss'],
})
export class ModalAceptarPage implements OnInit {

  constructor(private modalController: ModalController,
    private navParams: NavParams) { }

  solicitud:any;

  aceptarJSON = {
    id_solicitud:"",
    respuesta: "",
    folio: null,
    motivo: null,
    factura:""
  }

  ngOnInit() {
    this.solicitud = this.navParams.get('datos_orden');
    this.aceptarJSON.id_solicitud = this.solicitud.solicitud.id;
    console.log(this.solicitud)
  }

  logForm() {
    if (this.aceptarJSON.folio != null) {
      this.aceptarJSON.motivo = "Si, se realizó la cotización"
    }
    if(this.aceptarJSON.respuesta == "No"){
      this.aceptarJSON.folio = "Sin registro.";
    }

    console.log(this.aceptarJSON);

    this.precotizacion(this.solicitud.solicitud.id, this.aceptarJSON.motivo, this.aceptarJSON.folio);
    this.montoFactura(this.aceptarJSON.id_solicitud, this.aceptarJSON.factura);
    this.cerrar();
  }

  async precotizacion(id_solicitud, motivo, folio) {
    // let url = "http://45.76.235.21/letrimex_v2/public/pre_cotizacion/" + id_solicitud + "/" + motivo + "/" + folio;
    let url = "http://localhost/letrimex_v2/public/pre_cotizacion/" + id_solicitud + "/" + motivo + "/" + folio;
    const response2 = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    console.log("Status de precotizacion", response2.status);
  }

  async montoFactura(id_solicitud, factura){
    // let url = "http://45.76.235.21/letrimex_v2/public/api/setMonto/" + id_solicitud + "/" + factura;
    let url = "http://localhost/letrimex_v2/public/api/setMonto/" + id_solicitud + "/" + factura;
    const response2 = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    console.log("Status de monto factura", response2.status);
  }

  cerrar() {
    this.modalController.dismiss();
  }

  async guardarLocal() {
    if (this.aceptarJSON.respuesta == "Si") {
      // id_solicitud
      let url = "http://localhost/letrimex_v2/public/tiempo_cliente/" + this.solicitud.solicitud.id;
      // let url = "http://45.76.235.21/letrimex_v2/public/tiempo_cliente/" + this.solicitud.solicitud.id;
      const response2 = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
      console.log("Status de tiempo_cliente", response2.status);

    }
  }
}
