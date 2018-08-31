import { Empresa } from '../models/empresa';
import { AbstractService } from './abstract-service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {
  Router
} from '@angular/router';

@Injectable()
export class AmbienteService extends AbstractService<any> {

  constructor(router: Router, http: Http) {
    super(router, http);
  }
  public getWebService(): string {
    return 'ambiente';
  }

  public buscarNome(){
    let url = this.urlWebBase + "/buscarmarca";
    return this.http.get(url).map(res =>{
        return res.json();
    });
  }
}