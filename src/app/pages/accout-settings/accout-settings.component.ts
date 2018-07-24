import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SettingsService, UsuarioService } from '../../services/service.index';
import { Router } from '@angular/router';

declare var swal: any;
declare function init_plugins();


@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {
  formp: FormGroup;

  constructor( 
    public _ajustes: SettingsService,
    public _usuarioService: UsuarioService,
    public router: Router ) { }

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      if (pass1 === pass2) {
          return null;
      }
      return {
        sonIguales: true
      };
    };
  }

  ngOnInit() {
    this.colocarCheck();
    this.formp = new FormGroup({
      passwordActual: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required)
      }, {validators: this.sonIguales('password', 'password2') }    );
  }
  cambiarColor(tema: string, link: any) {
      this.aplicarCheck( link );
      this._ajustes.aplicarTema( tema );
      }
  aplicarCheck( link: any ) {
    let selectores: any = document.getElementsByClassName('selector');
    for ( let ref of selectores) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }
  colocarCheck() {
    let selectores: any = document.getElementsByClassName('selector');
    let tema =  this._ajustes.ajustes.tema;
    for ( let ref of selectores) {
      if ( ref.getAttribute('data-theme') === tema ){
        ref.classList.add('working');
        break;
      }
    }
  }
  cambiarPassword() {
    if (this.formp.invalid) {
      swal('Importante', 'Las contraseñas deben ser iguales', 'warning');
      return;
    }
      let pass1 = this.formp.value.passwordActual;
      let pass2 = this.formp.value.password;
      this._usuarioService.cambiarPassword(pass1, pass2, this._usuarioService.usuario.id)
      .subscribe( resp => this._usuarioService.logout());

  }

}
