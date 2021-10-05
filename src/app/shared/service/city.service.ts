import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICidade } from '../interfaces/city.interface';

@Injectable()

export class CityService {

    constructor(
        private _http: HttpClient
    ) { }

    fetchCity(uf: string) {
        return this._http.get<ICidade[]>(`${environment.baseUrlCity + uf}/municipios`).toPromise()
    }

    fetchCidade(id: number) {
        return this._http.get<any>(`${environment.baseUrlAPI}/localidades/municipios/${id}`).toPromise()
    }
}