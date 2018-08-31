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
export class EmpresaService extends AbstractService<Empresa> {

  constructor(router: Router, http: Http) {
    super(router, http);
  }
  public getWebService(): string {
    return 'empresa';
  }

  public buscarEmpresa() {
    let url = this.urlWebBase + "/buscaempresa";
    return this.http.get(url).map(res => {
      return res.json();
    });
  }

  public logar(obj) {
    let url = this.urlWebBase + '/logar';
    return this.http.post(url, obj).map(res => {
      return res.json();
    })
  }
}