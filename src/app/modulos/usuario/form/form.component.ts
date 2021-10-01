import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ICidade } from 'src/app/shared/interfaces/city.interface';
import { CityService } from 'src/app/shared/service/city.service';
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
  hide = true;
  estados = STATES;
  cidades: ICidade[] = [];

  private _onDestroy = new Subject<void>()

  constructor(
    private _fb: FormBuilder,
    private _service: UserService,
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
    private _cidade: CityService
  ) {
    this._activatedRouter.params.subscribe((param) => this.id = param.id)
  }
  
  ngOnInit(): void {
    this.initForm()
  }
  
  ngAfterViewInit(): void {
    if(this.id) {
      this._service.fetchById(this.id)
      .then((res) => this.form.patchValue(res))
    }
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
          }) 
          this._router.navigate(['usuario']);
        })
        .finally(() => this.loading = false)
    }
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
    })
  }

}
