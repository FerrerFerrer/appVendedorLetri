import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-rechazo',
  templateUrl: './modal-rechazo.page.html',
  styleUrls: ['./modal-rechazo.page.scss'],
})
export class ModalRechazoPage implements OnInit {

  constructor(private modalController: ModalController) { }

  rechazoJSON = {
    id_solicitud: "",
    respuesta: "No",
    motivo: null,
    folio: null
  }

  async logForm() {
    const data = {
      'solicitud_id': this.rechazoJSON.id_solicitud,
      'motivo': this.rechazoJSON.motivo
    }

    let url = "http://192.168.88.153/letrimex_v2/public/api/rechazo";
    const response2 = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    console.log("Status de rechazo", response2.status);
    this.rechazoJSON.folio = "Sin registro."
    this.cerrar();
  }

  ngOnInit() {
  }

  cerrar() {
   
    this.modalController.dismiss();
  }
}
