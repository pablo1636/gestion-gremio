import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class SubirArchivoService {

  constructor() { }
// esto es puro javascrip

  subirArchivo( archivo: File, tipo: string, id: string ) {

    return new Promise( (resolve, reject ) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append( 'imagen', archivo, archivo.name );

      xhr.onreadystatechange = function() {

        if ( xhr.readyState === 4 ) {

          if ( xhr.status === 200 ) {
            console.log( 'Imagen subida' );
            resolve(  xhr.response  );
          } else {
            console.log( 'Fallo la subida' );
            reject( xhr.response );
          }

        }
      };
      let url = URL_SERVICIOS + '/archivo/imagen/' + tipo + '/' + id;
      xhr.open('POST', url, true );
      xhr.send( formData );

    });




  }

}
