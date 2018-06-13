import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {DatabaseServiceProvider} from '../../providers/database-service/database-service';

/**
 * Generated class for the AddPedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-add-pedido',
    templateUrl: 'add-pedido.html',
})
export class AddPedidoPage {

    allProductos: any[];
    cliente: string;
    data = {cliente_id: 0, producto_id: 0, producto: "", presentacion_id: 0, presentacion: "", precio_id: 0, cantidad: 0, precio: 0, upload: 0, remote_orden_venta_id: 0, remote_orden_venta_detalle_id: 0, confirmado: 0, enviado: 0};
    productos: any[];

    constructor(public navCtrl: NavController, public navParams: NavParams, public databaseService: DatabaseServiceProvider) {
        this.getDatos(navParams.get("cliente_id"), navParams.get("cliente"), navParams.get("productos"));
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddPedidoPage');
    }

    findProducto(ev: any) {
        // Reset items back to all of the items
        this.getAllProductos();

        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            /*this.productos = this.allProductos.filter((producto: any) => {
                return (producto.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });*/
        }
    }

    private getDatos(cliente_id, cliente: string, productos: any[]) {
      this.cliente = cliente;
      this.data.cliente_id = cliente_id;
      this.allProductos = productos;
    }

    private getAllProductos() {
        this.productos = this.allProductos;
        /*this.databaseService.getAllProductos()
        .then(productos => {
            console.log(productos);
            this.allProductos = productos;
        })
        .catch(error => {
            console.error(error);
        });*/
    }

    savePedido() {
        console.log('savePedido AddPedidoPage');
    }

}
