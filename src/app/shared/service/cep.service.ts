import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cep } from '../models/cep.model.';

@Injectable()
export class CepService {

  constructor(
    private _http: HttpClient
  ) { }

  fetchCep(cep: number) {
    return this._http.get<Cep>(`${environment.baseUrlCep + cep}/json`)
      .toPromise()
      .then((res) => new Cep(res))
  }
}