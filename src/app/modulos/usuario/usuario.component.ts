import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUsuario } from './interface/usuario.interface';
import { UserService } from './service/user.service';
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs';
import { SEXO } from './constantes/sexo.constantes';
import { SEXOENUM } from './enum/sexo.enum';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['name', 'email', 'telefone', 'sexo', 'status'];
  dataSource: MatTableDataSource<IUsuario> = new MatTableDataSource(undefined);
  sexoList = SEXO
  sexoEnum = SEXOENUM

  private _onDestroy = new Subject<void>()

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _service: UserService
  ) { }
  
  ngOnInit(): void {
    this._service.fetchData().pipe(takeUntil(this._onDestroy)).subscribe((res) => this.dataSource.data = res)
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
 
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
