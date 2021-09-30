import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUsuario } from '../interface/usuario.interface';
import { mapToNumber } from 'src/app/utils/function';
import { Observable } from 'rxjs';

@Injectable()

export class UserService  {

  constructor(
    private _firestore: AngularFirestore,
    private _snackBar: MatSnackBar
  ) {  }

  fetchData() {
    return this._firestore.collection<IUsuario>('usuarioDb')
      .valueChanges({idField: 'id'})
  }

  fetchById(id: string) {

  }

  insert(data: IUsuario) {
    data.telefone = mapToNumber(data.telefone);
    
    return this._firestore.collection<IUsuario>('usuarioDb')
      .add(data)
      .then(() => {
        this._snackBar.open("Usuário cadastrado com sucesso.", "X");
      })
      .catch((error) => {
        this._snackBar.open(error.menssage, "X");
      })
  }

  update(data: IUsuario) {

  }

  remove(id: string) {

  }
}
