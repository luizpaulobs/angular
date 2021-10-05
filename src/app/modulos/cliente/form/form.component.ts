import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {

  formG: FormGroup;
  formF: FormGroup;
  formJ: FormGroup;
  typePeople: boolean = false;

  constructor(
    private _fb: FormBuilder
  ) { 

  }

  ngOnInit(): void {
    this.formG = this._fb.group({
      name: [undefined, [Validators.required]],
      telefone: [undefined, [Validators.required]],
      email: [undefined, [Validators.required, Validators.email]],
      data: [undefined, [Validators.required]],
      status: [true]
    })

    this.formF = this._fb.group({
      cpf: [undefined, [Validators.required]],
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

}
