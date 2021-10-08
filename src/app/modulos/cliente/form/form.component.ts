import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { combineLatest, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, take, takeUntil } from 'rxjs/operators';
import { ModalComponent } from 'src/app/shared/components/removermodal/modal.component';
import { ICidade } from 'src/app/shared/interfaces/city.interface';
import { Cep } from 'src/app/shared/models/cep.model.';
import { CepService } from 'src/app/shared/service/cep.service';
import { CityService } from 'src/app/shared/service/city.service';
import { MyErrorStateMatcher } from 'src/app/shared/service/errosStateMatcher.service';
import { CIVIL, STATES } from 'src/app/utils/function';
import { ClienteService } from '../service/cliente.service';
import { ClienteForm } from './model/client-form.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit, AfterViewInit, OnDestroy {

  formG: FormGroup;
  formF: FormGroup;
  formJ: FormGroup;
  loading: boolean = false;
  civil = CIVIL;
  estados = STATES;
  cidades: ICidade[] = [];
  matcher = new MyErrorStateMatcher();
  id: string;
  minData: Date = new Date();
  // minData: Date = moment().subtract(18, 'year').toDate();
  private _cep: Cep;
  private _onDestroy = new Subject<void>();

  formTeste: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _cidade: CityService,
    private _cepService: CepService,
    private dialog: MatDialog,
    private _router: Router,
    private _service: ClienteService,
    private _activatedRouter: ActivatedRoute,
  ) {
    this._activatedRouter.params.subscribe((param) => this.id = param.id);
  }

  ngOnInit(): void {
    this._initForms();
    this._checkData();
  }

  ngAfterViewInit(): void {

    this.formG.get('cep').valueChanges
      .pipe(takeUntil(this._onDestroy), debounceTime(1000), distinctUntilChanged())
      .subscribe(async (res) => {

        if (res.length < 8) return;

        this._cep = await this._cepService.fetchCep(res);
        this.ufChanges();
        this.formG.patchValue(this._cep);
      });


    if (this.id) {
      this._service.fetchById(this.id)
        .then((res) => {
          this.formG.patchValue({ data: res.data.toDate(), ...res });
          res.typePeople ? this.formJ.patchValue(res) : this.formF.patchValue(res);
        });
    }
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  salvar() {
    if (this.formG.valid && (this.formF.valid || this.formJ.valid)) {
      let data;

      if (this.formG.get('typePeople').value) {
        data = { ...this.formG.value, ...this.formJ.value };
      } else {
        data = { ...this.formG.value, ...this.formF.value };
      }

      this.loading = true;

      this._service.save(data, this.id)
        .then(() => {
          this.formG.reset({
            status: true
          });
          this.formF.reset();
          this.formJ.reset();
          this._router.navigate(['cliente']);
        })
        .finally(() => this.loading = false);
    }
  }

  back() {
    if (this.formG.valid) {
      const dialogRef = this.dialog.open(ModalComponent, {
        width: '400px',
        data: { text: `Deseja cancelar a operação?`, title: 'Aviso!' }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this._router.navigate(['cliente']);
        }
      });
      return;
    }
    this._router.navigate(['cliente']);
  }

  private ufChanges() {
    this.formG.get('uf').valueChanges
      .pipe(takeUntil(this._onDestroy), distinctUntilChanged())
      .subscribe(async (res) => {
        this.cidades = await this._cidade.fetchCity(res);
        this.formG.patchValue({ localidade: Number(this._cep.ibge) });
      });
  }


  private _initForms() {
    this.formG = this._fb.group(new ClienteForm());


    this.formF = this._fb.group({
      cpf: [undefined, [Validators.required, Validators.minLength(11)]],
      rg: [undefined, [Validators.required]],
      estado_civil: [undefined, Validators.required]
    });

    this.formJ = this._fb.group({
      nome_fantasia: [undefined],
      cnpj: [undefined, [Validators.required]],
      inscricao_estadual: [undefined],
      inscricao_municipal: [undefined]
    });
  }

  private _checkData() {
    this.formG.get('data').valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe((res) => {
        if (res != undefined && moment.isMoment(res)) {
          this.formG.get('data').setValue(res.toDate());
        }
      });
  }

}
