import { Injectable, EventEmitter } from '@angular/core';


@Injectable()
export class ModalNewsUsuarioService {

  public ocultoU: string = 'oculto';
  public notificacionU = new EventEmitter<any>();
  constructor() {

   }

   ocultarModalU() {
    this.ocultoU = 'oculto';
  }

  mostrarModalU( ) {
    this.ocultoU = '';
  }

}
