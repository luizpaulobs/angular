import { ICep } from "../interfaces/cep.interface";

export class Cep implements ICep {
    constructor(init?: Partial<Cep>) {
        this.logradouro = init.logradouro;
        this.complemento = init.complemento
        this.bairro = init.bairro;
        this.localidade = init.localidade
        this.ibge = init.ibge;
        this.uf = init.uf;
    }

    logradouro: string = undefined;
    complemento: string = undefined;
    bairro: string = undefined;
    localidade: string = undefined;
    ibge: string = undefined;
    uf: string = undefined;
}
