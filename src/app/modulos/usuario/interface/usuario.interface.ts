import { IEndereco } from "src/app/shared/interfaces/endereco.interface";

export interface IUsuario extends IEndereco {
    id?: string,
    name: string,
    email: string,
    senha: string,
    telefone: number,
    cpf: number,
    sexo: number | string,
    status: boolean
}