

export class metodos {
    public idEmpresa : number;
    constructor() {
        let idEmpresa = sessionStorage.getItem("idEmpresa");
        this.idEmpresa = parseInt(idEmpresa);
    }

}