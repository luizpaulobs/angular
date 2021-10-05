import { ICliente } from "./cliente.interface";

export interface IJuridica extends ICliente {
    cnpj: number,
    nome_fantasia: string,
    inscricao_estadual: number,
    inscricao_municipal: number
}