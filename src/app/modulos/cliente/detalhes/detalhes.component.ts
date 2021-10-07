import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CityService } from 'src/app/shared/service/city.service';
import { IFisica } from '../interface/fisica.interface';
import { IJuridica } from '../interface/juridica.interface';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetalhesComponent implements OnInit {

  dataConfig: any;
  hide = true;
  cidade;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { detalhes: IFisica | IJuridica },
    private _cidade: CityService
  ) { }

  ngOnInit(): void {

    this._cidade.fetchCidade(this.data.detalhes.localidade)
      .then(res => {
        this.dataConfig = this.data.detalhes
        this.dataConfig.cidade = res.nome
      })
  }



}
