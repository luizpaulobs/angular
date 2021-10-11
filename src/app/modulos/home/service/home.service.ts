import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import * as moment from "moment";
import { map, tap } from "rxjs/operators";
import { ICliente } from "../../cliente/interface/cliente.interface";
import { IProdutos } from "../../produtos/interface/produtos.interface";
import { IUsuario } from "../../usuario/interface/usuario.interface";


@Injectable()

export class HomeService {

    readonly bancoCliente: string = "clienteDb";
    readonly bancoUsuario: string = "usuarioDb";
    readonly bancoProduto: string = "produtoDb";

    constructor(
        private _firestore: AngularFirestore,
    ) { }

    fetchCliente() {
        return this._firestore
            .collection<ICliente>(this.bancoCliente)
            .valueChanges()
            .pipe(map(res => res.length));
    }

    fetchUsuario() {
        return this._firestore
            .collection<IUsuario>(this.bancoUsuario)
            .valueChanges()
            .pipe(map(res => res.length));
    }

    fetchProduto() {
        return this._firestore
            .collection<IProdutos>(this.bancoProduto)
            .valueChanges()
            .pipe(map(res => res.length));
    }

    totalProduto() {
        return this._firestore
            .collection<IProdutos>(this.bancoProduto)
            .valueChanges()
            .pipe(
                map(res =>
                    res.filter(item =>
                        item.qtd_entrada > 0 && item.data_cadastro.toDate().toDateString() == new Date().toDateString())
                )
            );
    }

}