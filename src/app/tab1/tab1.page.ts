import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalRechazoPage } from '../paginas/modal-rechazo/modal-rechazo.page';
import { ModalRechazoPageModule } from '../paginas/modal-rechazo/modal-rechazo.module';
import { ModalAceptarPage } from '../paginas/modal-aceptar/modal-aceptar.page';
import { ModalAceptarPageModule } from '../paginas/modal-aceptar/modal-aceptar.module';
import { range } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  id_solicitud =localStorage.getItem('id_solicitud')

  

  solicitudes = [
    {
      id: "1",
      telefono: "8442986748",
      correo_electronico: "torneosferrer@hotmail.com",
      direccion_de_contacto: "evotek",
      categoria: "Evento",
      zona: "Saltillo",
      requerimiento: "Sanitario portatil",
      numero_de_ocupantes: "1-50",
      fecha: "07/09/22",
      comentarios: "Urgente"
    },
    {
      id: "2",
      telefono: "8442986748",
      correo_electronico: "ferrerferrer@hotmail.com",
      direccion_de_contacto: "letrimex",
      categoria: "Construcción",
      zona: "Saltillo",
      requerimiento: "Sanitario portatil",
      numero_de_ocupantes: "1-50",
      fecha: "07/09/22",
      comentarios: "Para ayer"
    },
  ]
  
  aceptadasRechazadas = [
  
  ]

  constructor(private modalController: ModalController) {
  }

  usuario = {
    user: "",
    password: ""
  }


  async rechazarSolicitud(id) {
    this.tiempoRespuestaVendedor(this.solicitudes[id].id);
    const modal = await this.modalController.create({
      component: ModalRechazoPage,
      componentProps: {
        datos_orden : this.solicitudes[id],
        ModalRechazoPageModule
      }
    });
    await modal.present();
    localStorage.setItem(id, "Rechazada")
    this.aceptadasRechazadas.push(localStorage.getItem(id));
  }

  async aceptarSolicitud(id) {
    this.tiempoRespuestaVendedor(this.solicitudes[id].id);
    const modal = await this.modalController.create({
      component: ModalAceptarPage,
      componentProps: {
        datos_orden : this.solicitudes[id],
        ModalAceptarPageModule
      }
    });
    await modal.present();
    localStorage.setItem(id, "Aceptada")
    this.aceptadasRechazadas.push(localStorage.getItem(id));
  }


  async pendienteSolicitud(id){
    const modal = await this.modalController.create({
      component: ModalAceptarPage,
      componentProps: {
        datos_orden : this.solicitudes[id],
        ModalAceptarPageModule
      }
    });
    await modal.present();
  }

  async tiempoRespuestaVendedor(id){
    let url = "http://192.168.88.237/letrimex_v2/public/tiempo_respuesta/" + id;
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

