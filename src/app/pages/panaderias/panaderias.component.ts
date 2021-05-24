import { Component, OnInit } from '@angular/core';
import { PanaderiaService } from '../../services/service.index';
import { Panaderia } from '../../models/panaderia.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panaderias',
  templateUrl: './panaderias.component.html',
  styles: []
})
export class PanaderiasComponent implements OnInit {
  panaderias: Panaderia[] = [];
  totalRegistros = 0;
  totalPaginas: number = 0;
  desde: number = 1;
  cargando: boolean = true;

  constructor(
    public _panaderiaService: PanaderiaService,
    public router: Router
    ) { }

  ngOnInit() {
    this.cargarPanaderia();
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


}
