import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICep } from '../interfaces/cep.interface';

@Injectable()
export class CepService {

    constructor(
        private _http: HttpClient
    ) {}

    fetchCep(cep: string) {
       return this._http.get<ICep>(`//viacep.com.br/ws/${cep}/json`)
       .toPromise()
       .then((res) => {
         delete res.cep
         return res
       })

    }
}