import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS, URL_SERVICIOS_IMAGEN } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: string = 'usuario'): any {


    let url = URL_SERVICIOS_IMAGEN + '/uploads';


    if ( !img ) {
      return URL_SERVICIOS_IMAGEN + '/assets/no-img.jpg';

    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    switch ( tipo ) {

      case 'usuario':
        url += '/usuarios/' + img;
      break;

      case 'persona':
        url += '/personas/' + img;
      break;

      case 'panaderia':
         url += '/panaderias/' + img;
      break;

      default:
        console.log('tipo de imagen no existe, usuario, persona, panaderias');
        url = URL_SERVICIOS_IMAGEN + '/assets/no-img.jpg';
    }

    return url;
    }

}
