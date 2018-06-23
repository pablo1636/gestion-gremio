import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  // Falta declarar las otras busquedas
  // personas: Persona[] = [];
  // panaderias: Panaderia[] = [];

  constructor(
    // para recibir parmetros
    public activatedRoute: ActivatedRoute,
    // para hacer peticiones al backend
    public http: HttpClient
  ) {
    activatedRoute.params
    .subscribe( params => {
      let termino = params['termino'];
      this.buscar( termino );

    });
   }

  ngOnInit() {
  }
  buscar( termino: string) {
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get(url)
    .subscribe( (resp: any) => {
      this.usuarios = resp.usuarios;
      // this.personas = resp.personas;
      // this.panaderias = resp.panaderias
    
    });

  }

}
