import { Component, OnInit, ViewChild } from '@angular/core';
import { Method } from 'ionicons/dist/types/stencil-public-runtime';
import { Tab1Page } from 'src/app/tab1/tab1.page';
import { Router } from '@angular/router';
import { Local } from 'protractor/built/driverProviders';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController} from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  builder: FormGroup;
  
  login = {
    user: "",
    password: ""
  }

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private router: Router) {

    this.builder = this.fb.group({
      'user': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
  }

  usuarioExport: any;

  ngOnInit() {

    const user = localStorage.getItem('user');
    if (localStorage.getItem('user') != null) {
        console.log("Session guardada");
        this.router.navigateByUrl('/tabs/tab1');
    }
  }

  async logForm() {

    let valido = this.validarCampos(this.login.user,this.login.password);

    if (await valido == false) {
      const alert = await this.alertController.create({
        header: 'Usuario no encontrado',
        cssClass: 'my-custom-class',
        message: 'Datos desconocidos',
        buttons: ['Aceptar']
      });
      await alert.present();
      return
    }
    localStorage.setItem('user', this.login.user)
    localStorage.setItem('password', this.login.password)

    this.router.navigateByUrl('/tabs/tab1');
  }

  async validarCampos(user, password) {
  // let session =  this.validarUsuario(user, password)
    if (user == "") {
      const alert = await this.alertController.create({
        header: 'Usuario desconocido',
        cssClass: 'my-custom-class',
        message: 'Intenta con otro usuario',
        buttons: ['Aceptar']
      });

      await alert.present();
      return false;
    }

    if (password == "") {
      const alert = await this.alertController.create({
        header: 'Contraseña desconocida',
        cssClass: 'my-custom-class',
        message: 'Intenta de nuevo',
        buttons: ['Aceptar']
      });

      await alert.present();
      return false;
    }
    let session = this.validarUsuario(user, password)
    return session
        }

  async validarUsuario(user, password){
    const url2 = "http://192.168.88.153/letrimex_v2/public/listaVendedoresApp";
    const response = await fetch(url2, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })

    let req = await response.json();
    console.log(req);
    for(let i of req){
      if(i.nombre_completo == user){
        if(i.telefono == password){
          localStorage.setItem('id_vendedor',i.id)
          return true
        }
      }
    }
    return false;
  }

}
