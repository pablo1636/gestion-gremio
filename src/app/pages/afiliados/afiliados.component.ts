import { Component, OnInit } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { PersonaService } from '../../services/service.index';


@Component({
  selector: 'app-afiliados',
  templateUrl: './afiliados.component.html',
  styles: []
})
export class AfiliadosComponent implements OnInit {
  personas: Persona[] = [];
  totalRegistros = 0;

  constructor( public _personaService: PersonaService) { }

  ngOnInit() {
    this.cargarAfiliados();
  }

  cargarAfiliados() {

    this._personaService.cargarPersonas().subscribe((resp: any) => {
                this.totalRegistros = resp.total;
                this.personas = resp.personas;
    });

  }


}
