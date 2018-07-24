import { Component, OnInit } from '@angular/core';

declare var swal: any;

@Component({
  selector: 'app-abm-panaderias',
  templateUrl: './abm-panaderias.component.html',
  styles: []
})
export class AbmPanaderiasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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

}
