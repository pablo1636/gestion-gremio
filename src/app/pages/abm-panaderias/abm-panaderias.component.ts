import { Component, OnInit } from '@angular/core';
import { PanaderiaService } from '../../services/service.index';
import { Panaderia } from '../../models/panaderia.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { ModalNewPanaderiaService } from '../../components/modal-new-panaderia/modal-new-panaderia.service';
import { Router } from '@angular/router';

declare var swal: any;

@Component({
  selector: 'app-abm-panaderias',
  templateUrl: './abm-panaderias.component.html',
  styles: []
})
export class AbmPanaderiasComponent implements OnInit {
  panaderias: Panaderia[] = [];
  totalRegistros = 0;
  totalPaginas: number = 0;
  desde: number = 1;
  cargando: boolean = true;
  borrarOk: number;

  constructor( public _panaderiaService: PanaderiaService,
              public _modalUploadService: ModalUploadService,
              public _modalNewPanaderia: ModalNewPanaderiaService,
              public router: Router ) { }

  ngOnInit() {
    this.cargarPanaderia();
    this._modalUploadService.notificacion
          .subscribe( resp => this.cargarPanaderia() );
    this._modalNewPanaderia.notificacionP
          .subscribe( resp => this.cargarPanaderia());

  }
  cargarPanaderia() {
        this.cargando = true;
        this._panaderiaService.cargarPanaderias(this.desde).subscribe((resp: any) => {
        this.panaderias = resp.panaderias;
        this.totalPaginas = resp.total_paginas;
        this.totalRegistros = resp.total;
        this.cargando = false;

    });
  }
  irAltaPanaderia() {
    this.router.navigate(['/alta-panaderia']);
}

mostrarModal( id: string ) {

    this._modalUploadService.mostrarModal( 'panaderias', id );

}
mostrarModalPanaderia() {
  this._modalNewPanaderia.mostrarModalP();
  }
buscarPanaderia( termino: string ) {
  if ( termino.length <= 0 ) {
    this.cargarPanaderia();
    return;
  }
  this.cargando = true;
  this._panaderiaService.buscarPanaderia( termino )
          .subscribe( (panaderias: Panaderia[]) => {

            this.panaderias = panaderias;
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
  this.cargarPanaderia();

}

crearPanaderia() {
    swal({
       title: 'Crear Panaderia',
       text: 'Ingrese el nombre de la panaderia',
       content: 'input',
       icon: 'info',
       buttons: true,
       dangerMode: true
     }).then( (valor: string ) => {

       swal(`Cargado con exito`);

     });

  }

  // METODO PARA BORRAR UNA PANADERIA Y CONTROLA QUE NO TENGA RELACIONES LABORALES PASO COMO PARAMETRO PANADERIA Y TOMO LOS ID NECESARIOS
  borrarPanaderia( panaderia: Panaderia ) {
    this._panaderiaService.borrarPanaderiaOk( panaderia.ID ).subscribe((resp: any) => {
      this.borrarOk = resp.condicion;
      if ( this.borrarOk === 0) {
      swal({
        title: '¿Esta seguro?',
        text: 'Esta a punto de borrar a ' + panaderia.RazonSocial,
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
      .then( borrar => {

        if (borrar) {
            this._panaderiaService.borrarPanaderia( panaderia.ID )
                    .subscribe( borrado => {
                        this.cargarPanaderia();
                    });

        }

      });
      } else {
        swal('Debe eliminar primero las relaciones', 'La panaderia no puede ser eliminada tiene relaciones', 'warning');
                    return true;

      }
    });

  }




}
