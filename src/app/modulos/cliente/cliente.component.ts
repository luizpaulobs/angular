import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'telefone', 'status', 'actions'];
  search = new FormControl(undefined)
  dataSource: {}

  constructor() { }

  ngOnInit(): void {
  }

}
