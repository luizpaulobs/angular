import { ICliente } from "./cliente.interface";

export interface IFisica extends ICliente {
    cpf: number,
    rg: number,
    estado_civil: string
}