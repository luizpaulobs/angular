import { Validators } from "@angular/forms";

export class ClienteForm {
    constructor() {
    }
    name = [undefined, [Validators.required, Validators.minLength(10), Validators.maxLength(60)]];
    telefone = [undefined, [Validators.required]];
    email = [undefined, [Validators.required, Validators.email]];
    data = [undefined, [Validators.required]];
    status = [true];
    cep = [undefined, [Validators.required, Validators.minLength(8)]];
    logradouro = [undefined, [Validators.required]];
    bairro = [undefined, [Validators.required]];
    numero = [undefined, [Validators.required]];
    outros = [undefined];
    uf = [undefined, [Validators.required]];
    localidade = [undefined, [Validators.required]];
    typePeople = [false];
}