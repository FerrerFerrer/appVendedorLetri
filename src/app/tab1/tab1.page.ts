import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalRechazoPage } from '../paginas/modal-rechazo/modal-rechazo.page';
import { ModalRechazoPageModule } from '../paginas/modal-rechazo/modal-rechazo.module';
import { ModalAceptarPage } from '../paginas/modal-aceptar/modal-aceptar.page';
import { ModalAceptarPageModule } from '../paginas/modal-aceptar/modal-aceptar.module';
import { Plugins } from '@capacitor/core';
import { Local } from 'protractor/built/driverProviders';
import { LocalNotifications, LocalNotificationSchema } from '@capacitor/local-notifications';

// const { LocalNotifications } = Plugins;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  notificationsDelayInSeconds: string = "";
  //id_solicitud = localStorage.getItem('id_solicitud')
  id_vendedor = localStorage.getItem('id_vendedor');
  solicitudes = [];
  ordenes = [];
  mapa = new Map();
  cantidadPeticiones = 0;
  ordenes2: any;

  constructor(private modalController: ModalController) {
  }

  usuario = {
    user: "",
    password: ""
  }

  async tiempoRespuestaVendedor(id) {
    // id de las solicitudes
    
    // let url = "http://45.76.235.21/letrimex_v2/public/tiempo_respuesta/" + id;
    let url = "http://192.168.88.153:8000/letrimex_v2/public/tiempo_respuesta/" + id;
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

  async ngOnInit() {
    let date = new Date();
    
    this.peticiones();
    // console.log(date.toDateString());
    console.log(date.toLocaleDateString());
    // await LocalNotifications.requestPermission();
    const next = setTimeout(() => { this.refrescar() }, 120000)
  }

  refrescar() {
    this.ngOnInit();
  }

  async sendNotification() {
    let date = new Date();
    
    var options: LocalNotificationSchema = {
      id: 1,
      extra: {
        data: 'Notificacion',
      },
      iconColor: '#0051b3',
      summaryText: date.toLocaleDateString(),
      largeBody: 'Tienes una nueva solicitud',
      title: 'Hola vendedor.',
      body: 'Solicitud a las ' + date.toLocaleTimeString()
    }
    LocalNotifications.schedule({ notifications: [options] })
      .then(() => {
        console.log('Recibiras notificaciones')
        // alert('Recibiras notificaciones de esta aplicación');
      })
  }
  

  async peticiones() {
    const url = "http://192.168.88.153:8000/letrimex_v2/public/api/solicitudes_vendedor/" + this.id_vendedor;
    const url2 = "http://192.168.88.153:8000/letrimex_v2/public/api/ordenes_vendedor/" + this.id_vendedor;
 
    // const url = "http://45.76.235.21/letrimex_v2/public/api/solicitudes_vendedor/" + this.id_vendedor;
    // const url2 = "http://45.76.235.21/letrimex_v2/public/api/ordenes_vendedor/" + this.id_vendedor;
    
    let data = {
      method: "GET",
      headers: { "Content-type": "application/json" }
    }
    const req = await fetch(url, data);
    this.solicitudes = await req.json();
    const req2 = await fetch(url2, data);
    this.ordenes = await req2.json();

    console.log("solicitud ",this.solicitudes);
    // console.log("vendedores ",this.ordenes);

      console.log("validando estados");
      for (let i = 0; i < this.ordenes.length; i++) {
        if (this.ordenes[i].tiempo_resp_sistema != null) {
          if (localStorage.getItem(this.ordenes[i].id) == "Aceptada") {
            this.mapa.set(this.ordenes[i].id, "Aceptada");
          }
          if (localStorage.getItem(this.ordenes[i].id) == "Rechazada") {
            this.mapa.set(this.ordenes[i].id, "Rechazada");
          }
        }
        else {
          this.mapa.set(this.ordenes[i].id, "Sin respuesta");
        }
      }


    if (this.cantidadPeticiones < this.ordenes.length) {
      this.cantidadPeticiones = this.ordenes.length;
      this.sendNotification();
    }


  }

  async rechazarSolicitud(soli) {
    // id de las solicitudes
    this.tiempoRespuestaVendedor(soli.solicitud.id);
    const modal = await this.modalController.create({
      component: ModalRechazoPage,
      componentProps: {
        datos_orden: soli,
        ModalRechazoPageModule
      }
    });
    localStorage.setItem(soli.solicitud.id, 'Rechazada');
    await modal.present();
  }

  async aceptarSolicitud(soli) {
    this.tiempoRespuestaVendedor(soli.solicitud.id);
    const modal = await this.modalController.create({
      component: ModalAceptarPage,
      componentProps: {
        datos_orden: soli,
        ModalAceptarPageModule
      }
    });
    localStorage.setItem(soli.solicitud.id, 'Aceptada');
    await modal.present();
  }


  async pendienteSolicitud(soli) {
    // id de las solicitudes
    if (localStorage.getItem(soli.solicitud.id) == "Aceptada") {
      const modal = await this.modalController.create({
        component: ModalAceptarPage,
        componentProps: {
          datos_orden: soli,
          ModalAceptarPageModule
        }
      });
      await modal.present();
    }
    if (localStorage.getItem(soli.solicitud.id) == "Rechazada") {
      const modal = await this.modalController.create({
        component: ModalRechazoPage,
        componentProps: {
          datos_orden: soli,
          ModalRechazoPageModule
        }
      });
      await modal.present();
    }

  }
}

