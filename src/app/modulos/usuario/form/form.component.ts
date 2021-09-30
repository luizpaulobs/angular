import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SEXO } from '../constantes/sexo.constantes';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {

  form: FormGroup
  sexoList = SEXO

  constructor(
    private _fb: FormBuilder,
    private _service: UserService
  ) {

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

  salvar(): void {
    if (this.form.valid) {
      this._service.insert(this.form.value)
        .then(() => {
          this.form.reset({
            sexo: 1,
            status: true
          });
        })
    }
  }

}
