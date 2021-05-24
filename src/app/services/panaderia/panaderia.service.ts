import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Panaderia } from '../../models/panaderia.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Pago } from '../../models/pago.model';
import { Configuracion } from '../../models/configuracion.model';


declare var swal: any;

@Injectable()
export class PanaderiaService {

  constructor( public http: HttpClient ) { }

  cargarPanaderiaId( id: string ) {

    let url = URL_SERVICIOS + '/panaderias/panaderia/' + id;
    return this.http.get( url );

  }


  cargarPanaderias( desde: number = 0 ) {

     let url = URL_SERVICIOS + '/panaderias/paginar/' + desde;

      return this.http.get( url );

  }
  buscarPanaderia( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/panaderia/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.panaderias );

  }
  crearPanaderia( panaderia: Panaderia ) {

  let url = URL_SERVICIOS + '/panaderias/panaderia';
  console.log(panaderia);

    return this.http.put( url, panaderia )
              .map( (resp: any) => {

                swal('Panaderia creada', panaderia.RazonSocial , 'success' );
                return resp.panaderia;
              })
              .catch( err => {

                swal( err.error.mensaje, 'No se pudo grabar panaderia', 'error' );
                return Observable.throw( err );
              });
  }
  actualizarPanaderia(panaderia: Panaderia){
    let url = URL_SERVICIOS + '/panaderias/panaderia/' + panaderia.ID;
    console.log( panaderia );
    return this.http.post( url, panaderia )
    .map( (resp: any) => {

      swal('Panaderia Actualizada', panaderia.RazonSocial , 'success' );
      return resp.panaderia;
    })
    .catch( err => {

      swal( err.error.mensaje, 'No se pudo actualizar panaderia', 'error' );
      return Observable.throw( err );
    });

  }

  borrarPanaderia( id: string ) {

    let url = URL_SERVICIOS + '/panaderias/panaderia/' + id;
    // url += '?token=' + this.token;
    // ver borrar imagen
    return this.http.delete( url )
                .map( resp => {
                  swal('Panaderia borrada', 'La panaderia a sido eliminada correctamente', 'success');
                  return true;
                });

  }
  borrarPanaderiaOk(id: string){
    let url = URL_SERVICIOS + '/panaderias/panaderiaBorrarOk/' + id;
    return this.http.get( url )
                .map( (resp: any) => {
                return resp;
                });


  }

  cargarSituacionLaboral( id: string ) {
    let url = URL_SERVICIOS + '/SituacionLaboral/situacionlaboralpanaderia/' + id;
    return this.http.get( url );

  }

  // funcion para dar de alta nuevo pago - terminado
  cargarPago( pago: Pago ) {

    let url = URL_SERVICIOS + '/pagos/pagos';
    return this.http.put( url, pago )
              .map( (resp: any) => {
                swal('Pago cargado', 'Operacion Realizada Exitosamente', 'success' );
                return resp.pagos;
              });
  }
  // funcion para cargar configuracion - terminado
cargarConfiguracion( ) {

  let url = URL_SERVICIOS + '/configuracion/configuracion';
  return this.http.get( url )
            .map( (resp: any) => {
              return resp.configuracion;
            });
}

// get de pagos realizados por panaderia
cargarCuotas( id: string) {
  let url = URL_SERVICIOS + '/pagos/pagos/' + id;
  return this.http.get( url );

}
// Borrar Cuota
borrarCuota( id: string ) {
    let url = URL_SERVICIOS + '/pagos/pagos/' + id;
      return this.http.delete( url )
                  .map( resp => {
                    swal('Cuota Borrada', 'La Cuota ha sido eliminada correctamente', 'success');
                    return true;
                  });
  
    }

}
