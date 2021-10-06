import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ModalComponent } from 'src/app/shared/components/removermodal/modal.component';
import { IFisica } from './interface/fisica.interface';
import { IJuridica } from './interface/juridica.interface';
import { ClienteService } from './service/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['name', 'typePeople', 'email', 'telefone', 'status', 'data', 'actions'];
  search = new FormControl(undefined)
  dataSource: MatTableDataSource<any> = new MatTableDataSource(undefined);

  private _onDestroy = new Subject<void>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _service: ClienteService,
    private dialog: MatDialog,
  ) { }
  
  ngOnInit(): void {
    this._service.fetchData().pipe(takeUntil(this._onDestroy)).subscribe((res) => {
      this.dataSource.data = res
      console.log(res);
      
    })
    
    this.search.valueChanges
      .pipe(takeUntil(this._onDestroy), debounceTime(500))
      .subscribe((res) => {
        this.dataSource.filter = res.trim().toLowerCase();
      })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();

  }

  remove(row: IFisica | IJuridica) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: { text: `Deseja excluir <b>${row.name}<b> ?`, title: 'Excluir' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this._service.remove(row.id)
      }
    });
  }
}
