import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
declare var swal: any;

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }
  // funcion para renovar token una vez terminado el plazo - terminado
  renuevaToken() {

    let url = URL_SERVICIOS + '/usuarios/token';
    let token = this.token;

    return this.http.post( url, token )
                .map( (resp: any) => {
                  this.token = resp.token;
                  localStorage.setItem('token', this.token );
                  console.log('Token renovado');

                  return true;
                })
                .catch( err => {
                  this.router.navigate(['/login']);
                  swal( 'No se pudo renovar token', 'No fue posible renovar token', 'error' );
                  return Observable.throw( err );
                });


  }
  // funcion para verificar que este logeado - terminado
  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  // funcion para cargar datos de logeo del storage - terminado
  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      this.menu = JSON.parse( localStorage.getItem('menu') );
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }

  }
// funcion para guardar datos logeo en el storage - terminado
  guardarStorage( id: string, token: string, usuario: Usuario, menu: any ) {

    localStorage.setItem('id', id );
    localStorage.setItem('IDSindicato', usuario.IDSindicato);
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario) );
    localStorage.setItem('menu', JSON.stringify(menu) );

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }
// funcion para salir de la seccion y limpia storage - terminado
  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    localStorage.removeItem('IDSindicato');
    localStorage.removeItem('id');

    this.router.navigate(['/login']);
  }
// funcion para ingresar al sistema - terminado
  login( usuario: Usuario, recordar: boolean = false ) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email );
    } else {
      localStorage.removeItem('email');
    }
    let url = URL_SERVICIOS + '/usuarios/login';
    return this.http.post( url, usuario )
                .map( (resp: any) => {
                  if ( resp.ok) {
                    this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
                  } else {
                    swal( 'Error en el login', 'Credenciales incorrectas', 'error' );

                  }
                  return true;
                })
                .catch( err => {
                  swal( 'Error en el login', 'Credenciales incorrectas', 'error' );
                  return Observable.throw(err);
                });

  }

// funcion para dar de alta nuevo usuario - terminado
  crearUsuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuarios/usuario';
    return this.http.put( url, usuario )
              .map( (resp: any) => {
                swal('Usuario creado', usuario.email, 'success' );
                return resp.usuario;
              })
              .catch( err => {

                swal( err.error.mensaje, 'Email ya existe', 'error' );
                return Observable.throw( err );
              });
  }

  actualizarUsuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuarios/usuario/' + usuario.id;
    // url += '?token=' + this.token;
      return this.http.post( url, usuario )
                .map( (resp: any) => {

                  if ( usuario.id === this.usuario.id ) {
                    let usuarioDB: Usuario = resp.usuario;
                    usuarioDB.password = ':)';
                    this.guardarStorage( usuarioDB.id, this.token, usuarioDB, this.menu );
                  }
                  swal('Usuario actualizado', usuario.nombre, 'success' );

                  return true;
                }).catch( err => {
                  swal( 'Mail incorrecto', 'El correo electronico ya existe', 'error' );
                  return Observable.throw( err );
                });

  }

  cambiarImagen( archivo: File, id: string ) {

    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
          .then( (resp: any) => {
            let respuesta = JSON.parse(resp);
            this.usuario.img = respuesta.usuario.img;
            swal( 'Imagen Actualizada', this.usuario.nombre, 'success' );
            this.guardarStorage( id, this.token, this.usuario, this.menu );

          })
          .catch( resp => {
            console.log( resp );
          }) ;

  }
  // funcion para cargar usuarios paginados - terminado
  cargarUsuarios( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/usuarios/paginar/' + desde;
    return this.http.get( url );

  }
  // funcion para caja de texto de busquedas - terminado
  buscarUsuarios( termino: string ) {

   let url = URL_SERVICIOS + '/busqueda/usuario/' + termino;
   return this.http.get( url )
                .map( (resp: any) => resp.usuarios );

  }
  // funcion para borrar fisicamente un usuario - terminado
  borrarUsuario( id: string ) {

    let url = URL_SERVICIOS + '/usuarios/usuario/' + id;
    // url += '?token=' + this.token;

    return this.http.delete( url )
                .map( resp => {
                  swal('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
                  return true;
                });

  }
  // funcion para cambiar el password - terminado
  cambiarPassword( password: string, passwordNuevo: string, id: string ) {
    let url = URL_SERVICIOS + '/usuarios/pass/' + id;
    let data = {
      password: password,
      passwordNuevo: passwordNuevo
   };
    // url += '?token=' + this.token;
      return this.http.put( url, data)
                .map( (resp: any) => {
                  if ( resp.ok ) {
                      swal('Contraseña actualizada', 'Debe ingresar nuevamente al sistema' , 'success' );
                  } else {
                      swal('No se pudo actualizar contraseña', resp.mensaje , 'error' );

                  }

                  this.logout();
                  return true;
                }).catch( err => {

                  swal( 'Contraseña incorrecta', 'Debe ingresar nuevamente', 'error' );
                  this.logout();
                  return Observable.throw( err );
                });

  }

}
