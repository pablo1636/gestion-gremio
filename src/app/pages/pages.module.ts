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
import { PersonasComponent } from './personas/personas.component';
import { AbmPanaderiasComponent } from './abm-panaderias/abm-panaderias.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AbmPersonaComponent } from './abm-persona/abm-persona.component';
import { AltaPanaderiaComponent } from './alta-panaderia/alta-panaderia.component';
import { AltaRelacionLaboralComponent } from '../components/alta-relacion-laboral/alta-relacion-laboral.component';
import { ModificarPanaderiaComponent } from './modificar-panaderia/modificar-panaderia.component';
import { AbmMediosComponent } from './abm-medios/abm-medios.component';
import { PersonalComponent } from './personal/personal.component';
import { FamiliarComponent } from './familiar/familiar.component';
import { AbmPersonalComponent } from './abm-personal/abm-personal.component';
import { AltaPersonalComponent } from './alta-personal/alta-personal.component';
import { AltaFamiliarComponent } from './alta-familiar/alta-familiar.component';
import { ModificarPersonalComponent } from './modificar-personal/modificar-personal.component';
import { ModificarFamiliarComponent } from './modificar-familiar/modificar-familiar.component';
import { AltaMediosComponent } from './alta-medios/alta-medios.component';
import { ModificarMediosComponent } from './modificar-medios/modificar-medios.component';
import { FichaPanaderiaComponent } from './ficha-panaderia/ficha-panaderia.component';
import { BoletaComponent } from './boleta/boleta.component';

// codigo de barras
import { NgxBarcodeModule } from 'ngx-barcode';

// Modales
import { AltaRelacionComponent } from '../components/alta-relacion/alta-relacion.component';
import { ModalNewPanaderiaComponent } from '../components/modal-new-panaderia/modal-new-panaderia.component';
import { AltaPersonaComponent } from './alta-persona/alta-persona.component';
import { ModalNewsUsuarioComponent } from '../components/modal-news-usuario/modal-news-usuario.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { BuscarResponsableComponent } from '../components/buscar-responsable/buscar-responsable.component';
import { IngresoPagoComponent } from '../components/ingreso-pago/ingreso-pago.component';


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
        ModalNewsUsuarioComponent,
        AbmPersonaComponent,
        AltaPersonaComponent,
        AltaRelacionComponent,
        ModalNewPanaderiaComponent,
        AltaPanaderiaComponent,
        BuscarResponsableComponent,
        AltaRelacionLaboralComponent,
        ModificarPanaderiaComponent,
        AbmMediosComponent,
        PersonalComponent,
        FamiliarComponent,
        AbmPersonalComponent,
        AltaPersonalComponent,
        AltaFamiliarComponent,
        ModificarPersonalComponent,
        ModificarFamiliarComponent,
        AltaMediosComponent,
        ModificarMediosComponent,
        FichaPanaderiaComponent,
        IngresoPagoComponent,
        BoletaComponent
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
        ReactiveFormsModule,
        NgxBarcodeModule
    ]

})

export class PagesModule {}
