import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  usuario = {
    user: '',
    password: '',
  }

  constructor(private router: Router) {}

  ngOnInit(){
    this.usuario.user = localStorage.getItem('user');
  }

  logOut(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
