import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUsuario } from '../interface/usuario.interface';
import { mapToNumber } from 'src/app/utils/function';

@Injectable()

export class UserService  {

  readonly banco: string = "usuarioDb"

  constructor(
    private _firestore: AngularFirestore,
    private _snackBar: MatSnackBar
  ) {  }

  fetchData() {
    return this._firestore.collection<IUsuario>(this.banco)
      .valueChanges({idField: 'id'})
  }

  fetchById(id: string): Promise<IUsuario> {
    return this._firestore.collection<IUsuario>(this.banco)
      .doc(id)
      .get()
      .toPromise()
      .then(res => {
        if(res.exists){
          return res.data() 
        }
        this._snackBar.open("Usuário não encontrado!")
        return undefined
      })
  }

  save(data: IUsuario, id: string) {
    if(id) {
      data.id = id
      return this._update(data);
    }
    return this._insert(data);
  }

  remove(id: string) {
    return this._firestore.collection<IUsuario>(this.banco)
      .doc(id)
      .delete()
      .then(() => {
        this._snackBar.open("Usuário excluído com sucesso.", "X");
      })
      .catch((error) => {
        this._snackBar.open(error, "X");
      })
  }

  private _insert(data: IUsuario) {
    data.telefone = mapToNumber(data.telefone);
    data.cpf = mapToNumber(data.cpf);
    data.cep = mapToNumber(data.cep)

    delete data.id;
    
    return this._firestore.collection<IUsuario>(this.banco)
      .add(data)
      .then(() => {
        this._snackBar.open("Usuário cadastrado com sucesso.", "X");
      })
      .catch((error) => {
        this._snackBar.open(error.menssage, "X");
      })
  }

  private _update(data: IUsuario) {
    return this._firestore.collection<IUsuario>(this.banco)
      .doc(data.id)
      .update(data)
      .then(() => {
        this._snackBar.open("Usuário atualizado com sucesso.", "X");
      })
      .catch((error) => {
        console.log(error);
        
        this._snackBar.open(error.menssage, "X");
      })
  }
}
