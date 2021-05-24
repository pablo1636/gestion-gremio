import { Component, OnInit } from '@angular/core';
import { Medios } from '../../models/medios.model';
import { MediosService } from '../../services/medios/medios.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-medios',
  templateUrl: './medios.component.html',
  styles: []
})
export class MediosComponent implements OnInit {

  medios: Medios[] = [];
  formBuscar: FormGroup;
  totalRegistros: number = 0;
  totalPaginas: number = 0;
  cargando: boolean = true;
  desde: number = 1;

  constructor(public _mediosService: MediosService) { }

  ngOnInit() {
      this.cargarMedios();
      this.formBuscar = new FormGroup({
      busqueda: new FormControl()
  });

}
// Metodo para buscar un medio funciona con el nombre del medio
buscarMedios( termino: string ) {
  if ( termino.length <= 0 ) {
    this.cargarMedios();
    return;
  }
  this.cargando = true;
  this._mediosService.buscarMedios( termino )
          .subscribe( (medios: Medios[]) => {
            this.medios = medios;
            this.cargando = false;
          });
}
// Metodo para cargar en variable los datos que llegan del backend
cargarMedios() {
  this.cargando = true;
  this._mediosService.cargarMedios(this.desde).subscribe((resp: any) => {
  this.medios = resp.medios;
  this.totalPaginas = resp.total_paginas;
  this.totalRegistros = resp.total;
  this.cargando = false;

});
}
// Metodo que pasa de una pagina a otra para poder realizar el paginado
cambiarDesde( valor: number ) {

  let desde = this.desde + valor;
  if ( desde > this.totalPaginas ) {
     return;
  }

  if ( desde < 1 ) {
    return;
  }
  this.desde += valor;
  this.cargarMedios();

}


}
