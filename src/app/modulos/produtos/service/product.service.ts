import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
import { mapToNumber } from 'src/app/utils/function';
import { IProdutos } from '../interface/produtos.interface';

@Injectable()

export class ProductService {

  readonly banco: string = "produtoDb"

  constructor(
    private _firestore: AngularFirestore,
    private _snackBar: MatSnackBar
  ) { }

  fetchData() {
    return this._firestore.collection<IProdutos>(this.banco)
      .valueChanges({ idField: 'id' })
  }

  fetchById(id: string): Promise<IProdutos> {
    return this._firestore.collection<IProdutos>(this.banco)
      .doc(id)
      .get()
      .toPromise()
      .then(res => {
        if (res.exists) {
          return res.data()
        }
        this._snackBar.open("Produto não encontrado!")
        return undefined
      })
  }

  save(data: IProdutos, id: string) {
    if (id) {
      data.id = id
      return this._update(data);
    }
    return this._insert(data);
  }

  remove(id: string) {
    return this._firestore.collection<IProdutos>(this.banco)
      .doc(id)
      .delete()
      .then(() => this._snackBar.open("Usuário excluído com sucesso.", "X"))
      .catch((error) => this._snackBar.open(error, "X"))
  }

  private _insert(data: IProdutos) {
    data.cod = mapToNumber(data.cod);
    data.qtd_entrada = mapToNumber(data.qtd_entrada);
    data.qtd_saida = mapToNumber(data.qtd_saida);
    data.valor = mapToNumber(data.valor);

    delete data.id;

    return this._firestore.collection<IProdutos>(this.banco)
      .add(data)
      .then(() => this._snackBar.open("Produto cadastrado com sucesso.", "X"))
      .catch((error) => this._snackBar.open(error.menssage, "X"))
  }

  private _update(data: IProdutos) {
    return this._firestore.collection<IProdutos>(this.banco)
      .doc(data.id)
      .update(data)
      .then(() => this._snackBar.open("Produto atualizado com sucesso.", "X"))
      .catch((error) => this._snackBar.open(error.menssage, "X"))
  }
}
