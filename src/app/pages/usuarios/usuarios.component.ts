import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { ModalNewsUsuarioService } from '../../components/modal-news-usuario/modal-news-usuario.service';

declare var swal: any;


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  // tslint:disable-next-line:no-inferrable-types
  desde: number = 0;
  // tslint:disable-next-line:no-inferrable-types
  cargando: boolean = true;

  // tslint:disable-next-line:no-inferrable-types
  totalRegistros: number = 0;
  

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService,
  public _modalNewsUsuario: ModalNewsUsuarioService ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
          .subscribe( resp => this.cargarUsuarios() );
  }

  mostrarModal( id: string ) {

    this._modalUploadService.mostrarModal( 'usuarios', id );
  }
  mostrarModalUsuario() {
  this._modalNewsUsuario.mostrarModalU();
  }



  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.cargarUsuarios( this.desde )
              .subscribe( (resp: any) => {
                this.totalRegistros = resp.total;
                this.usuarios = resp.usuarios;
                this.cargando = false;

              });

  }

  cambiarDesde( valor: number ) {

    let desde = this.desde + valor;

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
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
  guardarUsuario( usuario: Usuario ) {

    this._usuarioService.actualizarUsuario( usuario )
            .subscribe();

  }

}
