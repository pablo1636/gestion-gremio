import { Component, OnInit } from '@angular/core';
import { FichaPersonaService } from '../../services/service.index';
import { ActivatedRoute } from '@angular/router';
import { Persona } from '../../models/persona.model';
import { Familiar } from '../../models/familiar.model';
import { SituacionLaboral } from '../../models/situacionLaboral.model';


@Component({
  selector: 'app-ficha-persona',
  templateUrl: './ficha-persona.component.html',
  styles: []
})
export class FichaPersonaComponent implements OnInit {
  persona: Persona = new Persona('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  familiares: Familiar[] = [];
  laborales: SituacionLaboral[] = [];

  constructor(
    public _fichaPersonaServise: FichaPersonaService,
    public activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe( params => {
        let id = params['idPersona'];
        this.cargarPersona( id );
        this.cargarFamiliares( id );
        this.cargarLaborales( id );
        });
     }
    ngOnInit() {
    }

    cargarPersona(id: string) {
      this._fichaPersonaServise.cargarFichaPersona(id)
      .subscribe( ( resp: any ) => {
      this.persona = resp.persona;
      });
    }
    cargarFamiliares(id: string) {
      this._fichaPersonaServise.cargarFichaFamiliar(id)
      .subscribe( ( resp: any ) => {
       this.familiares = resp.grupofamiliar;
      });
    }
    cargarLaborales( id: string ) {
      this._fichaPersonaServise.cargarSituacionLaboral( id )
      .subscribe( (resp: any) => {
        this.laborales = resp.situacionlaboral;
      });

    }
}
