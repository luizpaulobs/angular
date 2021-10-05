import { IEndereco } from "src/app/shared/interfaces/endereco.interface";

export interface ICliente extends IEndereco {
    id?: string,
    nome: string,
    telefone: number,
    email: string,
    data: Date,
    status: boolean
}