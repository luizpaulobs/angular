import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {detalhes: IUsuario}

  ) { }

  ngOnInit(): void { 
    this.dataConfig = this.data.detalhes
  }

}
