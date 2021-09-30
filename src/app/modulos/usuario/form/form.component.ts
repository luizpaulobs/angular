import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SEXO } from '../constantes/sexo.constantes';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  sexoList = SEXO;
  id: string;
  loading: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _service: UserService,
    private _router: Router,
    private _activatedRouter: ActivatedRoute
  ) {
    this._activatedRouter.params.subscribe((param) => this.id = param.id)
  }
  
  ngOnInit(): void {
    this.form = this._fb.group({
      name: [undefined, [Validators.required, Validators.minLength(10), Validators.maxLength(60)]],
      email: [undefined, [Validators.required, Validators.email]],
      telefone: [undefined, [Validators.required]],
      sexo: [1],
      status: [true]
    })
  }
  
  ngAfterViewInit(): void {
    if(this.id) {
       this._service.fetchById(this.id)
       .then((res) => this.form.patchValue(res))
    }
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

}
