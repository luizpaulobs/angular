import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CityService } from 'src/app/shared/service/city.service';
import { IUsuario } from '../interface/usuario.interface';

export class Usuario implements IUsuario {
  constructor() { }

  id?: string;
  name: string;
  email: string;
  senha: string;
  telefone: number;
  cpf: number;
  sexo: string | number;
  status: boolean;
  cep: number;
  logradouro: string;
  bairro: string;
  numero: number;
  outros: string;
  uf: string;
  localidade: number;
  cidade?: any;
}

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetalhesComponent implements OnInit {

  dataConfig: Usuario = new Usuario();
  hide: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { detalhes: IUsuario; },
    private _cidade: CityService

  ) { }

  ngOnInit(): void {
    this._cidade.fetchCidade(this.data.detalhes.localidade)
      .then(res => {
        this.dataConfig = this.data.detalhes;
        this.dataConfig.cidade = res.nome;
      });

  }

}
