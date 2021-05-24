import { Component, OnInit } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { PersonaService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
declare var swal: any;
@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styles: []
})
export class PersonasComponent implements OnInit {
  personas: Persona[] = [];
  formBuscar: FormGroup;
  // tslint:disable-next-line:no-inferrable-types
  totalRegistros: number = 0;
  totalPaginas: number = 0;
  afiliado = true;
  cargando: boolean = true;
  desde: number = 1;
  borrarOk: number;

  constructor(
    public _personaService: PersonaService,
    public _modalUploadService: ModalUploadService,
    public router: Router ) { }

  ngOnInit() {
    this.formBuscar = new FormGroup({
      busqueda: new FormControl()
   });


    this.cargarPersona();
    this._modalUploadService.notificacion
          .subscribe( resp => this.cargarPersona() );
  }
  mostrarModal( id: string ) {
    this._modalUploadService.mostrarModal( 'personas', id );
  }
  buscarPersona( termino: string ) {


    if ( termino.length <= 0 ) {
      this.cargarPersona();
      return;
    }

    this.cargando = true;

    this._personaService.buscarPersona( termino )
            .subscribe( (personas: Persona[]) => {

              this.personas = personas;
              this.cargando = false;
            });

  }
  cargarPersona() {
    this.cargando = true;
    this._personaService.cargarPersonas(this.desde).subscribe((resp: any) => {
                this.totalPaginas = resp.total_paginas;
                this.totalRegistros = resp.total;
                this.personas = resp.personas;
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
    this.cargarPersona();

  }

  irAlta() {
      this.router.navigate(['/alta-persona']);
  }
  borrarPersona( persona: Persona ) {
    // console.log(this.borrarOk);

    this._personaService.borrarPersonaOk( persona.ID ).subscribe((resp: any) => {
      this.borrarOk = resp.condicion;
      console.log(this.borrarOk);
      if ( this.borrarOk === 0) {
      swal({
        title: '¿Esta seguro?',
        text: 'Esta a punto de borrar a ' + persona.ApellidoyNombre,
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
      .then( borrar => {

        if (borrar) {
            this._personaService.borrarPersona( persona.ID )
                    .subscribe( borrado => {
                        this.cargarPersona();
                        this.formBuscar.reset();
                    });

        }

      });
      } else {
        swal('Debe eliminar primero las relaciones', 'La persona no puede ser eliminada tiene relaciones', 'warning');
                    return true;

      }

    });


  }

}
