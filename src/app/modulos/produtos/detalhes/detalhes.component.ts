import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProdutos } from '../interface/produtos.interface';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetalhesComponent implements OnInit {

  dataConfig: IProdutos

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { detalhes: IProdutos },
  ) { }

  ngOnInit(): void {
    this.dataConfig = this.data.detalhes;
  }

}
