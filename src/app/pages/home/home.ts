import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../service/funcionario-service';
import { DadosGrafico } from '../../models/dadosGrafico';
import { Funcionario } from '../../models/funcionario';
import { Observable } from 'rxjs';
import { metodos } from '../../metodos';
import { HistoricoAvaliacao } from '../../models/HistoricoAvaliacao';

@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: ['home.scss'],
  providers: [FuncionarioService]
})
export class HomePage extends metodos implements OnInit {
  public multi: any[];
  public showLegend = true;
  public view: any[] = [600, 350];
  public dadosGrafico: DadosGrafico = new DadosGrafico;
  public buscando: boolean = false;
  public funcionarios: Funcionario[];
  public funcionario: Funcionario = new Funcionario();
  public funcionariosFiltrados;
  public mensagemErroAoMostrarGrafico: String = null;
  public numeroNota: number;
  public historicoAvaliacaoLista : HistoricoAvaliacao[] = [];
  public buscandoHistorico : Boolean = false;

  displayedColumns: string[] = ['funcionario', 'avaliacao','numeronota','dataCadastro'];
  constructor(public funcionarioService: FuncionarioService) {
    // Object.assign(this)
    super();
    this.dadosGrafico.dataInicio.setDate(1);

    this.buscando = true;
    this.buscarDadosGrafico();
  }

  ngOnInit() {
  }

  // options
  single = [
    {
      "name": "Satisfeito",
      "value": 0
    },
    {
      "name": "Regular",
      "value": 0
    },
    {
      "name": "Ruim",
      "value": 0
    }, {
      "name": "Pessimo",
      "value": 0
    }
  ];

  // public filter(value) {
  //   const filterValue = value.key.toLowerCase();
  //   const nome = this.funcionarios.filter(function (d) {
  //     return d.nome.toLowerCase().indexOf(filterValue) !== -1 || !filterValue;
  //   });
  //   this.funcionariosFiltrados = nome;
  // }

  colorScheme = {
    domain: ['#20ca36', '#e6e668', '#fcb040', '#ff0000']
  };

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  public displayFn(value: any): string {
    return value && typeof value === 'object' ? value.nome : value;
  }

  public buscarDadosGrafico() {
    this.dadosGrafico.idVendedor = null;
    if (this.funcionario) this.dadosGrafico.idVendedor = this.funcionario.id;
    this.dadosGrafico.numeroNota = 0;
    if (this.numeroNota > 1) {
      this.dadosGrafico.numeroNota = this.numeroNota;
    }
    this.dadosGrafico.idEmpresa = this.idEmpresa;
    this.dadosGrafico.dataFinal.setHours(23);
    this.dadosGrafico.dataFinal.setMinutes(59);
    this.dadosGrafico.dataFinal.setSeconds(59);
    this.dadosGrafico.dataInicio.setHours(0);
    this.dadosGrafico.dataInicio.setMinutes(0);
    this.dadosGrafico.dataInicio.setUTCSeconds(0);
    this.buscaHistoricoDeNotas();
    this.funcionarioService.buscarFuncionariosParaOGarafico(this.dadosGrafico).subscribe((data: DadosGrafico) => {
      this.mensagemErroAoMostrarGrafico = null;
      this.buscando = true;
      this.single[0].value = data.nota1;
      this.single[1].value = data.nota2;
      this.single[2].value = data.nota3;
      this.single[3].value = data.nota4;
      setTimeout(() => {
        this.buscando = false;
      }, 200);
    }, err => {
      console.error(err);
      this.buscando = true;
      this.mensagemErroAoMostrarGrafico = "Erro ao Buscar o Grafico"
    })
  }

  public buscaHistoricoDeNotas(){
    this.historicoAvaliacaoLista = [];
    if(this.dadosGrafico.idVendedor == null){
        return;
    }
    this.buscandoHistorico = true;
    this.funcionarioService.buscarHistorico(this.dadosGrafico).subscribe((historico : HistoricoAvaliacao[])=>{
        this.historicoAvaliacaoLista = historico;
        setTimeout(() => {
        this.buscandoHistorico = false;          
        }, 250);
    },err=>{
      this.buscandoHistorico = false;
    })
  }

  public buscarFuncionario(nome) {
    this.funcionarioService.buscarFuncionariosPorCodigoOuNome(nome.key, this.idEmpresa).subscribe((fun: Funcionario[]) => {
      this.funcionariosFiltrados = fun;
    })
  }

}
