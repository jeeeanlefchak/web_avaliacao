import { AbstractService } from './abstract-service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {
  Router
} from '@angular/router';
import { Funcionario } from '../models/funcionario';

@Injectable()
export class FuncionarioService extends AbstractService<Funcionario> {

  constructor(router: Router, http: Http) {
    super(router, http);
  }
  public getWebService(): string {
    return 'funcionario';
  }

  public buscarFuncionarios(idEmpresa) {
    let url = this.urlWebBase + "/funcionarios/" + idEmpresa;
    return this.http.get(url).map(res => {
      return res.json();
    });
  }

  public buscarFuncionariosParaOGarafico(dadosGrafico) {
    let url = this.urlWebBase + "/grafico";
    return this.http.post(url, dadosGrafico).map(res => {
      return res.json();
    });
  }

  buscarFuncionariosPorCodigoOuNome(codnome,idempresa) {
    let url = this.urlWebBase + "/codounome/" + codnome +'/'+ idempresa;
    return this.http.get(url).map(res => {
      return res.json();
    });
  }

  public buscarHistorico(dadosGrafico) {
    let url = this.urlWebBase + "/historico";
    return this.http.post(url, dadosGrafico).map(res => {
      return res.json();
    });
  }
}