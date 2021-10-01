import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICidade } from '../interfaces/city.interface';

@Injectable()

export class CityService {

    constructor(
        private _http: HttpClient
    ) { }

    fetchCity(uf: string) {
        return this._http.get<ICidade>(`//servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`).toPromise()
    }
}