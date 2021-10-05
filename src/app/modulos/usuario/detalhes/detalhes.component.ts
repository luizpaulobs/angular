import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CityService } from 'src/app/shared/service/city.service';
import { environment } from 'src/environments/environment';
import { IUsuario } from '../interface/usuario.interface';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetalhesComponent implements OnInit {

  dataConfig: IUsuario;
  hide = true;
  cidade;


  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { detalhes: IUsuario },
    private _cidade: CityService

  ) { }

  ngOnInit(): void {
    this.dataConfig = this.data.detalhes
    this._cidade.fetchCidade(this.data.detalhes.localidade)
      .then(res => this.dataConfig.cidade = res.nome
      )
  }

}
