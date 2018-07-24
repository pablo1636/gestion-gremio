import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { ModalNewsUsuarioService } from './modal-news-usuario.service';

declare var swal: any;


@Component({
  selector: 'app-modal-news-usuario',
  templateUrl: './modal-news-usuario.component.html',
  styles: []
})
export class ModalNewsUsuarioComponent implements OnInit {
  formb: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalNewUsuario: ModalNewsUsuarioService
             ) {  }



  ngOnInit() {
    this.formb = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)

    });
  }

  cerrarModalU() {

    this._modalNewUsuario.ocultarModalU();
    this.formb.reset();

  }
  registrarUsuario() {
    if (this.formb.invalid) {
      return;
    }

        let usuario = new Usuario(
        this.formb.value.nombre,
        this.formb.value.correo,
        this.formb.value.password
      );
      usuario.role = 'USER_ROLE';
      usuario.IDSindicato = localStorage.getItem('IDSindicato');
      console.log(usuario);
      this._usuarioService.crearUsuario( usuario)
      .subscribe( resp => {
        this._modalNewUsuario.notificacionU.emit(resp);
        this.formb.reset();
        this.cerrarModalU();
        });


  }

}
