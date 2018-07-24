import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Persona } from '../../models/persona.model';

import { Router } from '@angular/router';



@Injectable()
export class PersonaService {
  persona: Persona;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    console.log('Servicio de persona activo');
  }

  cargarPersonas( ) {

    let url = URL_SERVICIOS + '/personas?idsindicato=1';
    return this.http.get( url );

  }

}
