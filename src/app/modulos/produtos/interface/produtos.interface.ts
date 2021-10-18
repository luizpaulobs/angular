import { Moment } from "moment";

export interface IProdutos {
    id?: string,
    cod: number,
    nome: string,
    marca: string,
    validade: Moment,
    data_cadastro: Moment,
    qtd_entrada: number,
    qtd_saida: number,
    valor: number
}