export class AbstractModel {

    public id: number;
    public versao: number;
    public dataCadastro: Date = new Date();
    public dataAlteracao: Date = new Date();
    public deletado : Boolean = false;

    
}