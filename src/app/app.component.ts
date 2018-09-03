import { Component, ViewChild, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public logado: boolean;
  @ViewChild('sidemenu') sidemenu;
  public habiliarMenu: Boolean = false;
  constructor() {
  }

  public verificaMenu() {
    var empresaLogada = sessionStorage.getItem('idEmpresa');
    if (empresaLogada) {
      this.habiliarMenu = true;
    } else {
      this.habiliarMenu = false;
    }
    setTimeout(() => {
      this.verificaMenu();
    }, 1000);
  }

  ngOnInit() {
    this.verificaMenu();
  }

  public mudarPagina(page) {

  }
  public sair() {
    sessionStorage.removeItem('idEmpresa');
  }
}
