import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUsuario } from './interface/usuario.interface';
import { UserService } from './service/user.service';
import { debounceTime, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs';
import { SEXO } from './constantes/sexo.constantes';
import { SEXOENUM } from './enum/sexo.enum';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RemovermodalComponent } from './removermodal/removermodal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['name', 'email', 'telefone', 'sexo', 'status', 'actions'];
  dataSource: MatTableDataSource<IUsuario> = new MatTableDataSource(undefined);
  sexoList = SEXO
  sexoEnum = SEXOENUM
  search = new FormControl(undefined)

  private _onDestroy = new Subject<void>()

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _service: UserService,
    private dialog: MatDialog,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._service.fetchData().pipe(takeUntil(this._onDestroy)).subscribe((res) => {
      res.forEach(i => {
        switch (i.sexo) {
          case this.sexoEnum.MASCULINO:
            i.sexo = 'Masculino'
            break;
          case this.sexoEnum.FEMININO:
            i.sexo = 'Feminino'
            break;
          case this.sexoEnum.NAO_OPINAR:
            i.sexo = 'Não Opinar'
            break;
        }
      })

      this.dataSource.data = res
    })
    this.search.valueChanges
      .pipe(takeUntil(this._onDestroy), debounceTime(500))
      .subscribe((res) => {
        this.dataSource.filter = res.trim().toLowerCase();
      })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  remove(row: IUsuario) {
    const dialogRef = this.dialog.open(RemovermodalComponent, {
      width: '400px',
      data: { text: row.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this._service.remove(row.id)
      }
    });
  }

  editar(row: IUsuario) {
    this._router.navigate(['usuario/incluir']);
  }

}