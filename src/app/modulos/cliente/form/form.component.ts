import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { combineLatest, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, take, takeUntil } from 'rxjs/operators';
import { ModalComponent } from 'src/app/shared/components/removermodal/modal.component';
import { ICidade } from 'src/app/shared/interfaces/city.interface';
import { CepService } from 'src/app/shared/service/cep.service';
import { CityService } from 'src/app/shared/service/city.service';
import { MyErrorStateMatcher } from 'src/app/shared/service/errosStateMatcher.service';
import { CIVIL, STATES } from 'src/app/utils/function';
import { IFisica } from '../interface/fisica.interface';
import { IJuridica } from '../interface/juridica.interface';
import { ClienteService } from '../service/cliente.service';

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

  private _onDestroy = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private _cidade: CityService,
    private _cep: CepService,
    private dialog: MatDialog,
    private _router: Router,
    private _service: ClienteService,
    private _activatedRouter: ActivatedRoute,
  ) {
    this._activatedRouter.params.subscribe((param) => this.id = param.id)
  }

  ngOnInit(): void {
    this.initForms();
  }

  ngAfterViewInit(): void {
    combineLatest([this.formG.get('cep').valueChanges, this.formG.get('uf').valueChanges])
      .pipe(takeUntil(this._onDestroy), debounceTime(1000), distinctUntilChanged(), take(1))
      .subscribe(async (res) => {

        if (res[0].length < 8) return
        const cep = await this._cep.fetchCep(res[0])

        this.cidades = await this._cidade.fetchCity(res[1])

        this.formG.patchValue({ ...cep, localidade: Number(cep.ibge) })

      })

    if (this.id) {
      this._service.fetchById(this.id)
        .then((res) => {
          delete res.localidade
          this.formG.patchValue({ ...res, data: res.data.toDate() });
          if (res.typePeole) {
            this.formJ.patchValue(res);
          } else {
            this.formF.patchValue(res);
          }
        })
    }
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  salvar() {
    if (this.formG.valid && (this.formF.valid || this.formJ.valid)) {
      let data

      if (this.formF.valid) {
        data = { ...this.formG.value, ...this.formF.value }
      } else {
        data = { ...this.formG.value, ...this.formJ.value }
      }
      console.log(data);
      
      data.data = data.data.toDate()

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
        .finally(() => this.loading = false)
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
      return
    }
    this._router.navigate(['cliente']);
  }

  private initForms() {
    this.formG = this._fb.group({
      name: [undefined, [Validators.required, Validators.minLength(10), Validators.maxLength(60)]],
      telefone: [undefined, [Validators.required]],
      email: [undefined, [Validators.required, Validators.email]],
      data: [undefined, [Validators.required]],
      status: [true],
      cep: [undefined, [Validators.required, Validators.minLength(8)]],
      logradouro: [undefined, [Validators.required]],
      bairro: [undefined, [Validators.required]],
      numero: [undefined, [Validators.required]],
      outros: [undefined],
      uf: [undefined, [Validators.required]],
      localidade: [undefined, [Validators.required]],
      typePeople: [false]
    })


    this.formF = this._fb.group({
      cpf: [undefined, [Validators.required, Validators.minLength(11)]],
      rg: [undefined, [Validators.required]],
      estado_civil: [undefined, Validators.required]
    })

    this.formJ = this._fb.group({
      nome_fantasia: [undefined],
      cnpj: [undefined, [Validators.required]],
      inscricao_estadual: [undefined],
      inscricao_municipal: [undefined]
    })
  }

  testandoconflito() {
    let a: string = 'conflito'
  }

}
