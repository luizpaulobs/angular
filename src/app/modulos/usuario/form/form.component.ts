import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { combineLatest, merge, Observable, of, Subject } from 'rxjs';
import { concatMap, debounceTime, distinctUntilChanged, mergeAll, takeUntil } from 'rxjs/operators';
import { ModalComponent } from 'src/app/shared/components/removermodal/modal.component';
import { ICidade } from 'src/app/shared/interfaces/city.interface';
import { Cep } from 'src/app/shared/models/cep.model.';
import { CepService } from 'src/app/shared/service/cep.service';
import { CityService } from 'src/app/shared/service/city.service';
import { MyErrorStateMatcher } from 'src/app/shared/service/errosStateMatcher.service';
import { STATES } from 'src/app/utils/function';
import { SEXO } from '../constantes/sexo.constantes';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit, AfterViewInit, OnDestroy {

  form: FormGroup;
  sexoList = SEXO;
  id: string;
  loading: boolean = false;
  hide: boolean = true;
  estados: { id: string, name: string; }[] = STATES;
  cidades: ICidade[] = [];
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  private _cep: Cep;

  private _onDestroy = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private _service: UserService,
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
    private _cidade: CityService,
    private dialog: MatDialog,
    private _cepService: CepService
  ) {
    this._activatedRouter.params.subscribe((param) => this.id = param.id);
  }

  ngOnInit(): void {
    this.initForm();

  }

  ngAfterViewInit(): void {

    this.form.get('cep').valueChanges
      .pipe(takeUntil(this._onDestroy), debounceTime(1000), distinctUntilChanged())
      .subscribe(async (res) => {

        if (res.length < 8) return;

        this._cep = await this._cepService.fetchCep(res);
        this.ufChanges();
        this.form.patchValue(this._cep);
      });


    if (this.id)
      this._service.fetchById(this.id).then((res) => this.form.patchValue(res));


  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  salvar(): void {
    if (this.form.valid) {
      this.loading = true;

      this._service.save(this.form.value, this.id)
        .then(() => {
          this.form.reset({
            sexo: 1,
            status: true
          });

          this._router.navigate(['usuario']);
        })
        .finally(() => this.loading = false);
    }
  }

  back() {
    if (this.form.valid) {
      const dialogRef = this.dialog.open(ModalComponent, {
        width: '400px',
        data: { text: `Deseja cancelar a operação?`, title: 'Aviso!' }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this._router.navigate(['usuario']);
        }
      });
      return;
    }
    this._router.navigate(['usuario']);
  }

  private ufChanges() {
    this.form.get('uf').valueChanges
      .pipe(takeUntil(this._onDestroy), distinctUntilChanged())
      .subscribe(async (res) => {
        this.cidades = await this._cidade.fetchCity(res);
        this.form.patchValue({ localidade: Number(this._cep.ibge) });
      });
  }

  private initForm() {
    this.form = this._fb.group({
      name: [undefined, [Validators.required, Validators.minLength(10), Validators.maxLength(60)]],
      email: [undefined, [Validators.required, Validators.email]],
      senha: [undefined, [Validators.required, Validators.minLength(6)]],
      telefone: [undefined, [Validators.required]],
      cpf: [undefined, [Validators.required, Validators.minLength(11)]],
      sexo: [1, [Validators.required]],
      status: [true],
      cep: [undefined, [Validators.required, Validators.minLength(8)]],
      logradouro: [undefined, [Validators.required]],
      bairro: [undefined, [Validators.required]],
      numero: [undefined, [Validators.required]],
      outros: [undefined],
      uf: [undefined, [Validators.required]],
      localidade: [undefined, [Validators.required]]
    });
  }

}
