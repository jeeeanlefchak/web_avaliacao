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
  // name: string;
  // position: number;
  // weight: number;
  // symbol: string;
  public empresa : Empresa = new Empresa();
  public mensagemErro : String;
  public mensagem : string;
  constructor(public ambienteService : AmbienteService, public empresaService : EmpresaService) {

  }

  ngOnInit() {
    this.empresaService.buscarEmpresa().subscribe((res : Empresa)=>{
      if(res[0] != null){
        this.empresa = res[0];
      }
    },err=>{
        this.mensagemErro = err;
        this.mensagem = 'Erro ao Salvar';
    })

  }

  public salvar(){
    this.empresaService.save(this.empresa).subscribe((data : Empresa)=>{
      this.empresa = data;
      this.mensagem = 'Salvo Com Sucesso';
    })
  }


  applyFilter(filterValue: string) {
  }


}
