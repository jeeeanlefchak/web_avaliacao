import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public logado: boolean;

  constructor() {
    var empresaLogada = sessionStorage.getItem('idEmpresa');
    empresaLogada ? this.logado = false : this.logado = true;
  }

  public mudarPagina(page) {

  }
  public sair(){
    localStorage.clear();
  }
}
