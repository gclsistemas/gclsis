import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Toast} from '@ionic-native/toast';
import {DatabaseServiceProvider} from '../../providers/database-service/database-service';

/**
 * Generated class for the EditPedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-pedido',
  templateUrl: 'edit-pedido.html',
})
export class EditPedidoPage {

  cliente: string;
  data = {
    id: 0,
    cliente_id: 0,
    producto_id: 0,
    producto: "",
    presentacion_id: 0,
    presentacion: "",
    precio_id: 0,
    cantidad: 0,
    precio: 0,
    upload: 0,
    remote_orden_venta_id: 0,
    remote_orden_venta_detalle_id: 0,
    confirmado: 0,
    enviado: 0
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: Toast, public databaseService: DatabaseServiceProvider) {
    console.log('Hello EditPedidoPage');
    console.log(navParams.get("pedido"));
    this.getDatos(navParams.get("cliente"), navParams.get("pedido"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPedidoPage');
  }

  private getDatos(cliente: string, pedido: any) {
    this.cliente = cliente;
    this.data.id = pedido.id;
    this.data.cliente_id = pedido.cliente_id;
    this.data.producto_id = pedido.producto_id;
    this.data.producto = pedido.producto.nombre;
    this.data.presentacion_id = pedido.presentacion_id;
    this.data.presentacion = pedido.producto.presentacion;
    this.data.precio_id = pedido.precio_id;
    this.data.precio = pedido.precio;
    this.data.cantidad = pedido.cantidad;
    this.data.upload = pedido.upload;
    this.data.remote_orden_venta_id = pedido.remote_orden_venta_id;
    this.data.remote_orden_venta_detalle_id = pedido.remote_orden_venta_detalle_id;
    this.data.confirmado = pedido.confirmado;
    this.data.enviado = pedido.enviado;
  }

  updatePedido() {
    console.log('updatePedido EditPedidoPage');
    //this.toast.show('Se actualizo a ' + this.data.cantidad, '5000', 'center');
    this.databaseService.updatePedido(this.data)
      .then(res => {
        console.log(res);
        this.toast.show('Data updated', '5000', 'center').subscribe(
          toast => {
            this.navCtrl.popToRoot();
          }
        );
      })
      .catch(e => {
        console.log(e);
        this.toast.show(e, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      });
  }

}
