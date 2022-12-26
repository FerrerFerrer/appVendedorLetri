import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  // public _apiuri ='http://45.76.235.21/letrimex_v2/public/';
  public _apiuri ='http://localhost/letrimex_v2/public/';
  constructor() { }
}
