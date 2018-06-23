import { RouterModule, Routes } from '@angular/router';


// Importo rutas
import { PagesComponent } from './pages/pages.component';

// Importo Componentes
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './share/nopagefound/nopagefound.component';


const appRoutes: Routes = [
{ path: 'login' , component: LoginComponent },
{ path: 'register' , component: RegisterComponent },
{ path: '**' , component: NopagefoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
