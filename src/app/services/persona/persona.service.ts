import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Persona } from '../../models/persona.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Router } from '@angular/router';


declare var swal: any;
@Injectable()
export class PersonaService {
  persona: Persona;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {  }

  cargarPersonas( desde: number = 0 ) {

    let url = URL_SERVICIOS + '/personas/paginar/' + desde;
    return this.http.get( url );

  }
  cargarFamiliar( desde: number = 0 ) {

    let url = URL_SERVICIOS + '/personas/familiar/' + desde;
    return this.http.get( url );

  }
  cargarPersonal( desde: number = 0 ) {

    let url = URL_SERVICIOS + '/personas/personal/' + desde;
    return this.http.get( url );

  }
  cargarAfiliados( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/personas/afiliado/' + desde;
    return this.http.get( url );
  }
  buscarPersona( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/persona/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.personas );

  }
  buscarPersonal( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/personal/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.personas );

  }
  buscarResponsable( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/responsable/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.personas );

  }
  buscarFamiliar( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/familiar/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.personas );

  }
  buscarAfiliado( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/afiliado/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.personas );

  }
  crearPersona( persona: Persona ) {
        let url = URL_SERVICIOS + '/personas/persona';

    return this.http.put( url, persona )
              .map( (resp: any) => {
                if ( resp.err) {
                  swal('Error al Crear Persona', resp.mensaje, 'error' );
                  return resp;
                } else {
                  swal('Persona creada', persona.ApellidoyNombre, 'success' );
                  return resp; }
              });
              // .catch( err => {
              //   // console.log( resp.mensaje );
              //   swal( 'Error!!!', 'Error al crear Persona', 'error' );
              //   return Observable.throw( err );
              // });
  }

  borrarPersona( id: string ) {

    let url = URL_SERVICIOS + '/personas/persona/' + id;

    return this.http.delete( url )
                .map( resp => {
                  swal('Persona borrada', 'La persona a sido eliminada correctamente', 'success');
                  return true;
                });

  }
  borrarPersonaOk(id: string){
    let url = URL_SERVICIOS + '/personas/personaBorrarOk/' + id;
    return this.http.get( url )
                .map( (resp: any) => {
                return resp;
                });


  }
  borrarFamiliarOk(id: string){
    let url = URL_SERVICIOS + '/personas/familiarBorrarOk/' + id;
    return this.http.get( url )
                .map( (resp: any) => {
                return resp;
                });


  }

  borrarResponsableOk(id: string){
    let url = URL_SERVICIOS + '/personas/responsableBorrarOk/' + id;
    return this.http.get( url )
                .map( (resp: any) => {
                return resp;
                });


  }
  actualizarPersona( persona: Persona ) {
    let url = URL_SERVICIOS + '/personas/persona/' + persona.ID;
    // url += '?token=' + this.token;
      return this.http.post( url, persona )
                .map( (resp: any) => {

                  swal('Persona actualizada', persona.ApellidoyNombre, 'success' );

                  return true;
                });

  }

}
