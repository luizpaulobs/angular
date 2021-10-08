import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalComponent } from 'src/app/shared/components/removermodal/modal.component';
import { MyErrorStateMatcher } from 'src/app/shared/service/errosStateMatcher.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit, AfterViewInit, OnDestroy {

  form: FormGroup;
  id: string;
  matcher = new MyErrorStateMatcher();
  minData: Date = new Date();
  loading: boolean = false;

  private _onDestroy = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private dialog: MatDialog,
    private _service: ProductService,
    private _activatedRouter: ActivatedRoute,
  ) {
    this._activatedRouter.params.subscribe((param) => this.id = param.id);
  }

  ngOnInit(): void {
    this._initForm();
    this._checkData();
  }

  ngAfterViewInit(): void {
    this.form.get('data_cadastro').setValue(new Date);
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  back() {
    if (this.form.valid) {
      const dialogRef = this.dialog.open(ModalComponent, {
        width: '400px',
        data: { text: `Deseja cancelar a operação?`, title: 'Aviso!' }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this._router.navigate(['produtos']);
        }
      });
      return;
    }
    this._router.navigate(['produtos']);
  }

  salvar() {
    if (this.form.valid) {
      this.loading = true;
      console.log(this.form.value);


      this._service.save(this.form.value, this.id)
        .then(() => {
          this.form.reset({
            qtd_entrada: 1,
            qtd_saida: 1
          });

          this._router.navigate(['produtos']);
        })
        .finally(() => this.loading = false);
    }

  }

  private _initForm() {
    this.form = this._fb.group({
      cod: [undefined, [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
      nome: [undefined, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      marca: [undefined, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      validade: [undefined, [Validators.required]],
      data_cadastro: [undefined],
      qtd_entrada: [0],
      qtd_saida: [0],
      valor: [undefined, [Validators.required]]
    });
  }

  private _checkData() {
    this.form.get('validade').valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe((res) => {
        if (res != undefined && moment.isMoment(res)) {
          this.form.get('validade').setValue(res.toDate());
        }
      });
  }

}
