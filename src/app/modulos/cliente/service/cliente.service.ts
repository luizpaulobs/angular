import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
import { mapToNumber } from 'src/app/utils/function';
import { ICliente } from '../interface/cliente.interface';
import { IJuridica } from '../interface/juridica.interface';
import { IFisica } from '../interface/fisica.interface';

@Injectable()

export class ClienteService {

  readonly banco: string = "clienteDb";

  constructor(
    private _firestore: AngularFirestore,
    private _snackBar: MatSnackBar
  ) { }

  fetchData = () => this._firestore.collection<IFisica | IJuridica>(this.banco).valueChanges({ idField: 'id' });

  fetchById(id: string): Promise<IFisica | IJuridica> {
    return this._firestore.collection<IFisica | IJuridica>(this.banco)
      .doc(id)
      .get()
      .toPromise()
      .then(res => {
        if (res.exists) {
          return res.data();
        }
        this._snackBar.open("Cliente não encontrado!");
        return undefined;
      });
  }

  save(data: IFisica | IJuridica, id: string,) {
    if (id) {
      data.id = id;
      return this._update(data);
    }
    return this._insert(data);
  }

  remove(id: string) {
    return this._firestore.collection<IFisica | IJuridica>(this.banco)
      .doc(id)
      .delete()
      .then(() => {
        this._snackBar.open("Cliente excluído com sucesso.", "X");
      })
      .catch((error) => {
        this._snackBar.open(error, "X");
      });
  }

  private _insert(data: IFisica | IJuridica) {

    data.telefone = mapToNumber(data.telefone);
    data.cep = mapToNumber(data.cep);

    let _data;

    if (data.typePeople) {
      _data = data as IJuridica;
      _data.cnpj = mapToNumber(_data.cnpj);
    } else {
      _data = data as IFisica;
      _data.cpf = mapToNumber(_data.cpf);
      _data.rg = mapToNumber(_data.rg);
    }

    delete data.id;

    return this._firestore.collection<IFisica | IJuridica>(this.banco)
      .add(_data)
      .then(() => {
        this._snackBar.open("Cliente cadastrado com sucesso.", "X");
      })
      .catch((error) => {
        this._snackBar.open(error.menssage, "X");
      });
  }

  private _update(data: IFisica | IJuridica) {
    return this._firestore.collection<ICliente>(this.banco)
      .doc(data.id)
      .update(data)
      .then(() => {
        this._snackBar.open("Cliente atualizado com sucesso.", "X");
      })
      .catch((error) => {
        this._snackBar.open(error.menssage, "X");
      });
  }
}
