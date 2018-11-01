import { Component, OnInit } from '@angular/core';
import { AmbienteService } from '../../service/ambiente-service';
import { Empresa } from '../../models/empresa';
import { EmpresaService } from '../../service/empresa-service';

@Component({
  selector: 'ambiente',
  templateUrl: './empresa-cadastro.html',
  styleUrls: ['empresa-cadastro.scss'],
  providers: [AmbienteService, EmpresaService]
})
export class EmpresaPage implements OnInit {
  public empresa: Empresa = new Empresa();
  public mensagemErro: String;
  public mensagem: string;
  public listaEmpresas: Empresa[] = [];
  displayedColumns: string[] = ['codigo', 'nome', 'login', 'dataCadastro', 'acao'];
  public permiteCadastrarNovas: boolean = false;

  constructor(public ambienteService: AmbienteService, public empresaService: EmpresaService) {

  }

  ngOnInit() {
    this.mensagem = null;
    let idEmpresa = sessionStorage.getItem("idEmpresa");
    this.empresaService.findById(parseInt(idEmpresa)).subscribe((res: Empresa) => {
      if (res != null) {
        this.empresa = res;
        this.permiteCadastrarNovas = res.permiteCadastrarNovas;
        if (res.permiteCadastrarNovas) {
          this.empresa = new Empresa();
          this.buscaEmpresas();
        }
      }
    }, err => {
      this.mensagemErro = err;
      this.mensagem = 'Erro ao Salvar';
    })
  }

  public buscaEmpresas() {
    this.listaEmpresas = [];
    this.empresaService.buscarEmpresa().subscribe(empresas => {
      this.listaEmpresas = empresas;
    })
  }

  public editar(obj) {
    this.empresa = new Empresa();
    this.empresa = obj;
  }

  public excluir(obj) {
    obj.deletado = true;
    this.empresa = obj
    this.salvar();
  }
  public salvar() {
    this.mensagem = null;
    this.empresaService.save(this.empresa).subscribe((data: Empresa) => {
      this.empresa = data;
      this.mensagem = 'Salvo Com Sucesso';
      if(this.permiteCadastrarNovas){
        this.empresa = new Empresa();
        this.buscaEmpresas();
      }
      setTimeout(() => {
        this.mensagem = null;
      }, 2000);
    })
  }




}

