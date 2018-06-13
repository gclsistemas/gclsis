import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DatabaseServiceProvider} from '../../providers/database-service/database-service';
import {SyncServicesProvider} from '../../providers/sync-services/sync-services';
import {ClientePage} from "../cliente/cliente";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  /*static getPedidosCliente(arg0: any): any {
      throw new Error("Method not implemented.");
  }*/

  allClientes: any[];
  clientes: any[];
  productos: any[];
  pedidos: any[];

  constructor(public navCtrl: NavController, public databaseService: DatabaseServiceProvider, public syncService: SyncServicesProvider) {
    console.log('Hello Home Page');
  }

  ionViewDidLoad() {
    //this.downloadDatabase(1);
  }

  getAllClientes() {
    this.clientes = this.allClientes;
    /*this.databaseService.getAllClientes()
    .then(clientes => {
        console.log(clientes);
        this.clientes = clientes;
    })
    .catch(error => {
        console.error(error);
    });*/
  }

  getPedidosCliente(cliente_id) {
    let lstPedidos = this.pedidos.filter((pedido: any) => {
      return (pedido.cliente_id == cliente_id);
    });
    for (let i = 0; i < lstPedidos.length; i++) {
      for (let j = 0; j < this.productos.length; j++) {
        if (lstPedidos[i].producto_id == this.productos[j].id) {
          lstPedidos[i].producto = this.productos[j];
          break;
        }
      }
    }
    return lstPedidos;
  }

  goToClientePage(idx) {
    console.log("Go to cliente page", this.clientes[idx].id, this.clientes[idx].apellido, this.clientes[idx].nombre);
    let lstPedidos = this.getPedidosCliente(this.clientes[idx].id);
    console.dir(lstPedidos);
    this.navCtrl.push(ClientePage, {cliente: this.clientes[idx], pedidos: lstPedidos, productos: this.productos});
  }

  downloadDatabase(user_id) {
    this.syncService.download(user_id).then((data: any) => {
      console.dir(data);
      this.allClientes = data.clientes;
      this.productos = data.productos;
      this.pedidos = data.pedidos;
      for (let i = 0; i < data.pedidos.length; i++) {
        let pedido = data.pedidos[i];
        pedido.id = i + 1;
        this.pedidos[i] = pedido;
      }
      /*for (let i = 0; i < data.clientes.length; i++) {
          this.databaseService.createCliente(data.clientes[i]);
      }*/
      this.getAllClientes();
    });
  }

  findClientes(ev: any) {
    // Reset items back to all of the items
    this.getAllClientes();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.clientes = this.clientes.filter((cliente: any) => {
        return (cliente.apellido.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  uploadDatabase() {
    //
  }

}
