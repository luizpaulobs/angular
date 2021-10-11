import { Component, OnInit } from '@angular/core';
import { HomeService } from './service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cliente: number;
  produto: number;
  usuario: number;
  totalProdutos: any;

  constructor(
    private _service: HomeService
  ) { }

  ngOnInit(): void {
    this._service.fetchCliente().subscribe((res) => this.cliente = res);
    this._service.fetchUsuario().subscribe((res) => this.usuario = res);
    this._service.fetchProduto().subscribe((res) => this.produto = res);
    this._service.totalProduto().subscribe((res) => this.totalProdutos = res);
    
  }

}
