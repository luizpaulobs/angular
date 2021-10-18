import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ModalComponent } from 'src/app/shared/components/removermodal/modal.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { IProdutos } from './interface/produtos.interface';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['cod', 'nome', 'marca', 'validade', 'data_cadastro', 'qtd_entrada', 'qtd_saida', 'valor', 'actions'];
  search = new FormControl(undefined);
  dataSource: MatTableDataSource<any> = new MatTableDataSource(undefined);

  private _onDestroy = new Subject<void>();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _service: ProductService,
    private dialog: MatDialog,
  ) { }
  
  ngOnInit(): void {
    this._service.fetchData()
      .pipe(takeUntil(this._onDestroy))
      .subscribe((res) => this.dataSource.data = res);

    this.search.valueChanges
      .pipe(takeUntil(this._onDestroy), debounceTime(500))
      .subscribe((res) => this.dataSource.filter = res.trim().toLowerCase());
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  remove(row: IProdutos) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: { text: `Deseja excluir <b>${row.nome}<b> ?`, title: 'Excluir' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._service.remove(row.id);
      }
    });
  }

  info(row: IProdutos) {
    this.dialog.open(DetalhesComponent, {
      data: { detalhes: row }
    });
  }

}
