import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  id_vendedor = localStorage.getItem('id_vendedor');
  res: any;
  constructor() {}

  async ngOnInit() {
    const url = "http://192.168.88.153:8000/letrimex_v2/public/api/ordenes_vendedor/"+this.id_vendedor;
    let data = {
      method : "GET",
      headers: {"Content-type": "application/json"}
    }
    const req = await fetch(url, data);
    this.res = await req.json();
    console.log(this.res);
  }
}