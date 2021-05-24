import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FichaPersonaComponent } from './ficha-persona/ficha-persona.component';
import { AfiliadosComponent } from './afiliados/afiliados.component';
import { NoAfiliadosComponent } from './no-afiliados/no-afiliados.component';
import { PersonalComponent } from './personal/personal.component';
import { PanaderiasComponent } from './panaderias/panaderias.component';
import { MediosComponent } from './medios/medios.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { InformesComponent } from './informes/informes.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
// paginas especiales
import { BoletaComponent } from './boleta/boleta.component';

// Mantenimientos
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PersonasComponent } from './personas/personas.component';
import { AbmPanaderiasComponent } from './abm-panaderias/abm-panaderias.component';
import { AbmPersonaComponent } from './abm-persona/abm-persona.component';
import { AltaPersonaComponent } from './alta-persona/alta-persona.component';
import { AltaPanaderiaComponent } from './alta-panaderia/alta-panaderia.component';
import { ModificarPanaderiaComponent } from './modificar-panaderia/modificar-panaderia.component';
import { AbmMediosComponent } from './abm-medios/abm-medios.component';
import { FamiliarComponent } from './familiar/familiar.component';
import { AltaPersonalComponent } from './alta-personal/alta-personal.component';
import { AltaFamiliarComponent } from './alta-familiar/alta-familiar.component';
import { AbmPersonalComponent } from './abm-personal/abm-personal.component';
import { AltaMediosComponent } from './alta-medios/alta-medios.component';
import { ModificarPersonalComponent } from './modificar-personal/modificar-personal.component';
import { ModificarFamiliarComponent } from './modificar-familiar/modificar-familiar.component';
import { ModificarMediosComponent} from './modificar-medios/modificar-medios.component';
import { FichaPanaderiaComponent } from './ficha-panaderia/ficha-panaderia.component';


// Guards
import { LoginGuardGuard } from '../services/service.index';
import { AdminGuard } from '../services/service.index';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';















const pagesRoutes: Routes = [
    {
        path: '' ,
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [ VerificaTokenGuard],
                data: { titulo: 'Dashboard' }
            },
            { path: 'afiliados' , component: AfiliadosComponent, data: { titulo: 'Afiliados' } },
            { path: 'no-afiliados' , component: NoAfiliadosComponent, data: { titulo: ' No Afiliados' } },
            { path: 'personal' , component: PersonalComponent, data: { titulo: ' Personal' } },
            { path: 'panaderias' , component: PanaderiasComponent, data: { titulo: 'Panaderias' } },
            { path: 'medios' , component: MediosComponent, data: { titulo: 'Medios de Comunicacion' } },
            { path: 'account-settings' , component: AccoutSettingsComponent, data: { titulo: 'Ajustes de Tema' } },
            { path: 'perfil' , component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
            { path: 'ficha/:idPersona' , component: FichaPersonaComponent, data: { titulo: 'Ficha' } },
            { path: 'ficha-panaderia/:idPanaderia' , component: FichaPanaderiaComponent, data: { titulo: 'Ficha Panaderia' } },
            { path: 'informes' , component: InformesComponent, data: { titulo: 'Informes' } },
            { path: 'busqueda/:termino' , component: BusquedaComponent, data: { titulo: 'Buscador' } },
            { path: 'boleta/:idPago' , component: BoletaComponent, data: { titulo: 'Boleta' } },
            // Mantenimientos
            { path: 'usuarios' ,
             component: UsuariosComponent,
             canActivate: [ AdminGuard ],
             data: { titulo: 'Mantenimiento de Usuarios' }
            },
            { path: 'personas',
             component: PersonasComponent,
             canActivate: [ VerificaTokenGuard],
             data: { titulo: 'Mantenimiento de Personas' }
            },
            { path: 'abm-personal',
             component: AbmPersonalComponent,
             canActivate: [ VerificaTokenGuard],
             data: { titulo: 'Mantenimiento del Personal' }
             },
             { path: 'familiar',
             component: FamiliarComponent,
             canActivate: [ VerificaTokenGuard],
             data: { titulo: 'Mantenimiento de Familiares' }
             },
             { path: 'abm-panaderias',
             component: AbmPanaderiasComponent,
             canActivate: [ VerificaTokenGuard],
             data: { titulo: 'Mantenimiento de Panaderias' } },
             { path: 'alta-panaderia',
             component: AltaPanaderiaComponent,
             canActivate: [ VerificaTokenGuard],
             data: { titulo: 'Nueva Panaderia' } },
             { path: 'alta-familiar',
             component: AltaFamiliarComponent,
             canActivate: [ VerificaTokenGuard],
             data: { titulo: 'Nuevo Familiar' } },
             { path: 'modificar-panaderia/:idPanaderia',
             component: ModificarPanaderiaComponent,
             canActivate: [ VerificaTokenGuard],
             data: { titulo: 'Modificar Panaderia' } },
             { path: 'modificar-personal/:idPersona',
             component: ModificarPersonalComponent,
             canActivate: [ VerificaTokenGuard],
             data: { titulo: 'Modificar Personal' } },
             { path: 'modificar-familiar/:idPersona',
             component: ModificarFamiliarComponent,
             canActivate: [ VerificaTokenGuard],
             data: { titulo: 'Modificar Familiar' } },
             { path: 'abm-persona/:idPersona',
             component: AbmPersonaComponent,
             canActivate: [ VerificaTokenGuard],
             data: { titulo: 'Mantenimiento de Persona' } },
             { path: 'alta-persona',
             component: AltaPersonaComponent,
             canActivate: [ VerificaTokenGuard],
             data: { titulo: 'Nueva Persona' } },
             { path: 'alta-personal',
             component: AltaPersonalComponent,
             canActivate: [ VerificaTokenGuard],
             data: { titulo: 'Nuevo Personal' } },
             { path: 'abm-medios',
             component: AbmMediosComponent,
             canActivate: [ VerificaTokenGuard],
             data: { titulo: 'Mantenimiento de Medios' } },
             { path: 'alta-medios',
             component: AltaMediosComponent,
             canActivate: [ VerificaTokenGuard],
             data: { titulo: 'Nuevo Medio' } },
             { path: 'modificar-medios/:idMedio',
             component: ModificarMediosComponent,
             canActivate: [ VerificaTokenGuard],
             data: { titulo: 'Modificar Medio' } },

             { path: '' , redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
