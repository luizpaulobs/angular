import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICep } from '../interfaces/cep.interface';


@Injectable()
export class CepService {

    constructor(
        private _http: HttpClient
    ) {}

    fetchCep(cep: string) {
       return this._http.get<ICep>(`${environment.baseUrlCep + cep}/json`)
       .toPromise()
       .then((res) => {
         delete res.cep
         return res
       })

    }
}