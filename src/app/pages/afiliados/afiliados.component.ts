import { Component, OnInit } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { PersonaService } from '../../services/service.index';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-afiliados',
  templateUrl: './afiliados.component.html',
  styles: []
})
export class AfiliadosComponent implements OnInit {
  formBuscar: FormGroup;
  personas: Persona[] = [];
  totalRegistros = 0;
  totalPaginas: number = 0;
  desde: number = 1;
  cargando: boolean = true;

  constructor( public _personaService: PersonaService) { }

  ngOnInit() {
    this.formBuscar = new FormGroup({
      busqueda: new FormControl()
   });
    this.cargarAfiliados();
  }

  cargarAfiliados() {
      this.cargando = true;
      this._personaService.cargarAfiliados(this.desde).subscribe((resp: any) => {
                this.personas = resp.afiliados;
                this.totalPaginas = resp.total_paginas;
                this.totalRegistros = resp.total;
                this.cargando = false;
    });

  }
  cambiarDesde( valor: number ) {

    let desde = this.desde + valor;
    if ( desde > this.totalPaginas ) {
       return;
    }

    if ( desde < 1 ) {
      return;
    }
    this.desde += valor;
    this.cargarAfiliados();

  }
  buscarAfiliado( termino: string ) {


    if ( termino.length <= 0 ) {
      this.cargarAfiliados();
      return;
    }

    this.cargando = true;

    this._personaService.buscarAfiliado( termino )
            .subscribe( (personas: Persona[]) => {

              this.personas = personas;
              this.cargando = false;
            });

  }


}
