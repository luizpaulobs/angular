import * as moment from "moment";
import { Moment, MomentLongDateFormat } from "moment";
import { IEndereco } from "src/app/shared/interfaces/endereco.interface";

export interface ICliente extends IEndereco {
    id?: string,
    name: string,
    telefone: number,
    email: string,
    data: Moment,
    status: boolean,
    typePeole: Boolean
}