import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FichaPersonaComponent } from './ficha-persona/ficha-persona.component';
import { AfiliadosComponent } from './afiliados/afiliados.component';
import { NoAfiliadosComponent } from './no-afiliados/no-afiliados.component';
import { PanaderiasComponent } from './panaderias/panaderias.component';
import { MediosComponent } from './medios/medios.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { InformesComponent } from './informes/informes.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

// Mantenimientos
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PersonasComponent } from './personas/personas.component';
import { AbmPanaderiasComponent } from './abm-panaderias/abm-panaderias.component';

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
            { path: 'panaderias' , component: PanaderiasComponent, data: { titulo: 'Panaderias' } },
            { path: 'medios' , component: MediosComponent, data: { titulo: 'Medios de Comunicacion' } },
            { path: 'account-settings' , component: AccoutSettingsComponent, data: { titulo: 'Ajustes de Tema' } },
            { path: 'perfil' , component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
            { path: 'ficha' , component: FichaPersonaComponent, data: { titulo: 'Ficha' } },
            { path: 'informes' , component: InformesComponent, data: { titulo: 'Informes' } },
            { path: 'busqueda/:termino' , component: BusquedaComponent, data: { titulo: 'Buscador' } },
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
            { path: 'abm-panaderias',
             component: AbmPanaderiasComponent,
             canActivate: [ VerificaTokenGuard],
             data: { titulo: 'Mantenimiento de Panaderias' } },
            { path: '' , redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
