import { Component, OnInit, NgZone } from '@angular/core';
import { Funcionario } from '../../models/funcionario';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { FuncionarioService } from '../../service/funcionario-service';
import { metodos } from '../../metodos';

@Component({
	selector: 'funcionario-cadastro',
	templateUrl: './funcionario-cadastro.html',
	styleUrls: ['./funcionario-cadastro.scss'],
	providers: [FuncionarioService]
})
export class FuncionarioPage extends metodos implements OnInit  {
	public funcionario: Funcionario = new Funcionario();
	public salvando: boolean = false;
	public mensagem: String = '';
	public listaFuncionarios: Funcionario[] = [];
	public listaAposFiltrar;
	constructor(public funcionarioService: FuncionarioService, public snackBar: MatSnackBar, public ngZone: NgZone) {
		super()
	}

	ngOnInit() {
		this.buscarFuncionarios();
	}

	public buscarFuncionarios() {
		this.listaAposFiltrar = [];
		this.funcionarioService.buscarFuncionarios(this.idEmpresa).subscribe((lista: Funcionario[]) => {
			this.listaAposFiltrar = lista;
		})
	}
	displayedColumns: string[] = ['codigo', 'nome', 'dataCadastro', 'acao'];
	dataSource = new MatTableDataSource();

	public filter(event) {
		const val = event.target.value.toLowerCase();
		console.log(val);
		const razaoSocial = this.listaFuncionarios.filter(function (d) {
			return d.nome.toLowerCase().indexOf(val) !== -1 || !val;
		});
		this.listaAposFiltrar = razaoSocial;

	}

	public editar(obj) {
		this.funcionario = new Funcionario();
		this.funcionario = obj;
	}

	public excluir(obj) {
		obj.deletado = true;
		this.funcionarioService.save(obj).subscribe((res: Funcionario) => {
			// for (let i = 0; i < this.listaAposFiltrar.length; i++) {
			// 	if (this.listaAposFiltrar[i].id == res.id) {
			// 		this.listaAposFiltrar.splice(i, 1);
			// 	}
			// }
			this.buscarFuncionarios();
		})
	}

	public salvar() {
		if (this.funcionario.nome == null) {
			this.salvando = true;
			this.mensagem = "Informe o Nome";
			setTimeout(() => {
				this.salvando = false;
			}, 2500);
			return;
		}
		this.funcionario.idEmpresa = this.idEmpresa;
		// if (this.funcionario.id) {
		// 	for (let i = 0; this.listaFuncionarios.length; i++) {
		// 		if (this.funcionario.id == this.listaFuncionarios[i].id) {
		// 			this.listaFuncionarios[i] = this.funcionario;
		// 			break;
		// 		}
		// 	}
		// }
		this.funcionarioService.save(this.funcionario).subscribe((user: Funcionario) => {
			this.salvando = true;
			this.mensagem = 'Salvo Com Sucesso';
			this.listaAposFiltrar = [];
			this.buscarFuncionarios();
			this.funcionario = new Funcionario();
		}, err => {
			this.mensagem = 'Erro ao Salvar';
		})
		setTimeout(() => {
			this.salvando = false;
		}, 2500);
	}
}
