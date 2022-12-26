import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-rechazo',
  templateUrl: './modal-rechazo.page.html',
  styleUrls: ['./modal-rechazo.page.scss'],
})
export class ModalRechazoPage implements OnInit {

  constructor(private modalController: ModalController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController) { }

  solicitud:any;
  cargando:any;

  rechazoJSON = {
    id_solicitud: 0,
    respuesta: "No",
    motivo: "",
    folio: ""
  }



  async logForm() {
    let data = {
      'solicitud_id': this.rechazoJSON.id_solicitud,
      'motivo': this.rechazoJSON.motivo
    }

    let url = "http://localhost/letrimex_v2/public/rechazo";
    // let url = "http://45.76.235.21/letrimex_v2/public/rechazo";
    const response2 = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
          Accept: 'application/json',
          'Acces-Control-Allow-Origin':'*',
          'Content-Type': 'application/json'
      }
    });

    console.log("Status de rechazo", response2.status);
    this.rechazoJSON.folio = "Sin registro."
    this.cerrar();
  }

  ngOnInit() {
    this.solicitud = this.navParams.get('datos_orden');
    this.rechazoJSON.id_solicitud = this.solicitud.solicitud.id;
  }

  cerrar() {
    if(this.cargando != null){
      this.cargando.dismiss();
    }
    this.modalController.dismiss();
  }

  async loading(){
    this.cargando = await this.loadingCtrl.create({
      message: 'Enviando respuesta...',
      cssClass: 'custom-loading',
    });

    this.cargando.present();

  }
}
