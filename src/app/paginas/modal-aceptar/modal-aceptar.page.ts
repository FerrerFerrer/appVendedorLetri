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
    private navParams: NavParams,) { }

  solicitud = {
    id: "",
    telefono: "",
    correo_electronico: "",
    direccion_de_contacto: "",
    categoria: "",
    zona: "",
    requerimiento: "",
    numero_de_ocupantes: "",
    fecha: "",
    comentarios: ""
  }

  aceptarJSON = {
    id_solicitud: "1",
    respuesta: "",
    folio: null,
    motivo: null
  }

  logForm() {
    console.log(this.aceptarJSON)
    if (this.aceptarJSON.folio != null) {
      this.aceptarJSON.motivo = "Si, se realizó la cotización"
    }
    if(this.aceptarJSON.respuesta == "No"){
      this.aceptarJSON.folio = "Sin registro.";
    }
    this.precotizacion(this.aceptarJSON.id_solicitud, this.aceptarJSON.motivo, this.aceptarJSON.folio);
  }

  solicitud_terminada() {
    this.cerrar();
  }

  async precotizacion(id_solicitud, motivo, folio) {
    let url = "http://192.168.88.237/letrimex_v2/public/pre_cotizacion/" + id_solicitud + "/" + motivo + "/" + folio;
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

  ngOnInit() {
    this.solicitud = this.navParams.get('datos_orden');
  }

  cerrar() {
    this.modalController.dismiss();
  }

  async guardarLocal() {
    if (this.aceptarJSON.respuesta == "Si") {
      // id_solicitud
      let url = "http://192.168.88.237/public/tiempo_cliente/" + this.aceptarJSON.id_solicitud;

      const response2 = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
      console.log("Status de tiempo_respuesta", response2.status);

    }
  }
}
