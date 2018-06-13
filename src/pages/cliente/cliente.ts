import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AddPedidoPage} from "../add-pedido/add-pedido";
import {EditPedidoPage} from "../edit-pedido/edit-pedido";

@Component({
  selector: 'page-cliente',
  templateUrl: 'cliente.html',
})
export class ClientePage {

  cliente: any;
  pedidos: any[];
  productos: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('Hello ClientePage');
    this.cliente = navParams.get("cliente");
    this.pedidos = navParams.get("pedidos");
    this.productos = navParams.get("productos");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientePage');
  }

  goToAddPedidoPage() {
    console.log("Go to add pedido page");
    //this.navCtrl.push(AddPedidoPage, {cliente_id: this.cliente.id, cliente: this.cliente.apellido + ' ' + this.cliente.nombre});
    this.navCtrl.push(AddPedidoPage, {cliente_id: this.cliente.id, cliente: this.cliente.apellido + ' ' + this.cliente.nombre});
  }

  getPedidos() {

  }

  goToEditPedidoPage(idx) {
    console.log("Go to edit id ", this.pedidos[idx].id, " in pedido page");
    this.navCtrl.push(EditPedidoPage, {pedido: this.pedidos[idx], cliente: this.cliente.apellido + ' ' + this.cliente.nombre});
  }

}
