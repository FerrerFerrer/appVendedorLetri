import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-acepto',
  templateUrl: './form-acepto.component.html',
  styleUrls: ['./form-acepto.component.scss'],
})
export class FormAceptoComponent implements OnInit {

  constructor() { }
  formulario = {}
  logForm() {
    console.log(this.formulario)
  }
  ngOnInit() {}

}
