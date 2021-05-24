import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { ModalNewsUsuarioService } from '../../components/modal-news-usuario/modal-news-usuario.service';
import { PdfMakeWrapper, Txt, Table, Columns, Cell } from 'pdfmake-wrapper';

import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);



declare var swal: any;


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  // tslint:disable-next-line:no-inferrable-types
  desde: number = 1;
  // tslint:disable-next-line:no-inferrable-types
  cargando: boolean = true;

  // tslint:disable-next-line:no-inferrable-types
  totalPaginas: number = 0;
  // tslint:disable-next-line:no-inferrable-types
  totalRegistros: number = 0;
  idLogueado = this._usuarioService.usuario.id;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService,
    public _modalNewsUsuario: ModalNewsUsuarioService ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
          .subscribe( resp => this.cargarUsuarios() );
    this._modalNewsUsuario.notificacionU
    .subscribe( resp => this.cargarUsuarios());
  }

  mostrarModal( id: string ) {
    if ( id === this._usuarioService.usuario.id ) {
      swal('No puede cambiar imagen', 'Debe cambiarla desde su perfil', 'error');
      return;
    }
    this._modalUploadService.mostrarModal( 'usuarios', id );
  }
  mostrarModalUsuario() {
  this._modalNewsUsuario.mostrarModalU();
  }



  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.cargarUsuarios( this.desde )
              .subscribe( (resp: any) => {
                this.totalPaginas = resp.total_paginas;
                this.totalRegistros = resp.total;
                this.usuarios = resp.usuarios;
                this.cargando = false;

              });

  }

  cambiarDesde( valor: number ) {

    let desde = this.desde + valor;
    if ( desde > this.totalPaginas ) {
      // desde = this.totalPaginas - 1;
      return;
    }

    if ( desde < 1 ) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario( termino: string ) {


    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios( termino )
            .subscribe( (usuarios: Usuario[]) => {

              this.usuarios = usuarios;
              this.cargando = false;
            });

  }
  borrarUsuario( usuario: Usuario ) {

    if ( usuario.id === this._usuarioService.usuario.id ) {
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {

      if (borrar) {

        this._usuarioService.borrarUsuario( usuario.id )
                  .subscribe( borrado => {
                      this.cargarUsuarios();
                  });

      }

    });

  }
  crearPdf() {
    const pdf = new PdfMakeWrapper();
    pdf.header('Sindicato Panaderos Villa Mercedes');
    pdf.add(
      new Txt( this.usuarios[0].nombre ).bold().italics().end);
      this.usuarios.forEach( (value) => {
        pdf.add(

          new Table([

                  [ value.nombre, value.role]

          ]).end

    );
  });
  this.usuarios.forEach( (value) => {
    pdf.add(new Columns([ value.nombre, value.role ]).bold().end);
  });

    // pdf.add(
    //   new Table([
    //     [
    //         new Txt('Column 1').bold().end,
    //         new Cell( new Txt('Column 2 with colspan').bold().end ).colSpan(2).end
    //     ],
    //     [
    //         new Txt('Column 1').bold().end,
    //         'Column 2',
    //         'Column 3'
    //     ]
    // ]).end
    // );
    pdf.create().open();


  }
  guardarUsuario( usuario: Usuario ) {

    this._usuarioService.actualizarUsuario( usuario )
            .subscribe();

  }

}
