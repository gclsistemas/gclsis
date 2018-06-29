import {Injectable} from '@angular/core';
import {SQLiteObject} from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseServiceProvider {

  db: SQLiteObject = null;

  constructor() {
    console.log('DatabaseServiceProvider - constructor');
  }

  createTables() {
    console.log('DatabaseServiceProvider - createTables');
    this.db.executeSql('CREATE TABLE IF NOT EXISTS clientes(id INTEGER PRIMARY KEY AUTOINCREMENT, apellido VARCHAR, nombre VARCHAR, celular VARCHAR, telefono VARCHAR, email VARCHAR, ' +
      'direccion TEXT)', [])
      .then(res => console.log('Se creo la tabla clientes.'))
      .catch(e => console.log(e));

    this.db.executeSql('CREATE TABLE IF NOT EXISTS productos(id INTEGER PRIMARY KEY AUTOINCREMENT, marca VARCHAR, nombre VARCHAR, presentacion_id INTEGER, presentacion VARCHAR, ' +
      'precio_id INTEGER, precio REAL)', [])
      .then(res => console.log('Se creo la tabla productos.'))
      .catch(e => console.log(e));

    this.db.executeSql('CREATE TABLE IF NOT EXISTS pedidos(id INTEGER PRIMARY KEY AUTOINCREMENT, cliente_id INTEGER, producto_id INTEGER, presentacion_id INTEGER, precio_id INTEGER, ' +
      'cantidad INTEGER, precio REAL, upload BOOLEAN, remote_orden_venta_id INTEGER, remote_orden_venta_detalle_id INTEGER, confirmado BOOLEAN, enviado BOOLEAN)', [])
      .then(res => console.log('Se creo la tabla pedidos.'))
      .catch(e => console.log(e));
  }

  setDatabase(db: SQLiteObject) {
    console.log('DatabaseServiceProvider - setDatabase');
    if (this.db === null) {
      this.db = db;
    }
  }

  //Metodos de clientes

  createCliente(cliente: any) {
    console.log('DatabaseServiceProvider - createCliente');
    let sql = 'INSERT INTO clientes(id, apellido, nombre, celular, telefono, email, direccion) VALUES(?, ?, ?, ?, ?, ?, ?)';
    this.db.executeSql(sql, [cliente.id, cliente.apellido, cliente.nombre, cliente.celular, cliente.telefono, cliente.email, cliente.direccion]);
  }

  getAllClientes() {
    let sql = 'SELECT * FROM clientes';
    return this.db.executeSql(sql, [])
      .then(response => {
        let clientes = [];
        for (let index = 0; index < response.rows.length; index++) {
          clientes.push(response.rows.item(index));
        }
        return Promise.resolve(clientes);
      });
  }

  updateCliente(cliente: any) {
    console.log('DatabaseServiceProvider - updateCliente');
    let sql = 'UPDATE clientes SET celular=?, telefono=? WHERE id=?';
    return this.db.executeSql(sql, [cliente.celular, cliente.telefono, cliente.id]);
  }

  //Metodos de productos

  getAllProductos() {
    let sql = 'SELECT * FROM productos';
    return this.db.executeSql(sql, [])
      .then(response => {
        let productos = [];
        for (let index = 0; index < response.rows.length; index++) {
          productos.push(response.rows.item(index));
        }
        return Promise.resolve(productos);
      });
  }

  //Metodos de Pedidos de clientes

  deletePedido(id: number) {
    console.log('DatabaseServiceProvider - deletePedido');
    let sql = 'DELETE FROM pedidos WHERE id=?';
    return this.db.executeSql(sql, [id]);
  }

  getPedidosCliente(cliente_id) {
    let sql = 'SELECT * FROM pedidos WHERE cliente_id=?';
    return this.db.executeSql(sql, [cliente_id])
      .then(response => {
        let pedidosCliente = [];
        for (let index = 0; index < response.rows.length; index++) {
          pedidosCliente.push(response.rows.item(index));
        }
        return Promise.resolve(pedidosCliente);
      })
      .catch(error => Promise.reject(error));
  }

  savePedido(pedido: any) {
    console.log('DatabaseServiceProvider - savePedido');
    let sql = 'INSERT INTO pedidos(title, completed) VALUES(?,?)';
    return this.db.executeSql(sql, [pedido.title, pedido.completed]);
  }

  updatePedido(pedido: any) {
    console.log('DatabaseServiceProvider - updatePedido');
    let sql = 'UPDATE pedidos SET cantidad=? WHERE id=?';
    return this.db.executeSql(sql, [pedido.cantidad, pedido.id]);
  }

}
