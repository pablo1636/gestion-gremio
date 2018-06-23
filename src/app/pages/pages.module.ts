import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../share/share.module';
import { PagesComponent } from './pages.component';
// Paginas
import { DashboardComponent } from './dashboard/dashboard.component';
import { PanaderiasComponent } from './panaderias/panaderias.component';
import { AfiliadosComponent } from './afiliados/afiliados.component';
import { PAGES_ROUTES } from './pages.routes';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { FichaPersonaComponent } from './ficha-persona/ficha-persona.component';
import { NoAfiliadosComponent } from './no-afiliados/no-afiliados.component';
import { MediosComponent } from './medios/medios.component';
import { InformesComponent } from './informes/informes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { PersonasComponent } from './personas/personas.component';
import { AbmPanaderiasComponent } from './abm-panaderias/abm-panaderias.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ModalNewsUsuarioComponent } from '../components/modal-news-usuario/modal-news-usuario.component';

// Pipes Module
import { PipesModule } from '../pipes/pipes.module';







@NgModule ({
    declarations: [
        DashboardComponent,
        PanaderiasComponent,
        AfiliadosComponent,
        PagesComponent,
        AccoutSettingsComponent,
        ProfileComponent,
        FichaPersonaComponent,
        NoAfiliadosComponent,
        MediosComponent,
        InformesComponent,
        UsuariosComponent,
        ModalUploadComponent,
        PersonasComponent,
        AbmPanaderiasComponent,
        BusquedaComponent,
        ModalNewsUsuarioComponent
        ],
    exports: [
        DashboardComponent,
        PanaderiasComponent,
        AfiliadosComponent,
        NoAfiliadosComponent,
        MediosComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        PAGES_ROUTES,
        PipesModule,
        ReactiveFormsModule
    ]

})

export class PagesModule {}
