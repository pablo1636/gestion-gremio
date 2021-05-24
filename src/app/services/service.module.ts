import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// servicios de modales
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { ModalNewsUsuarioService } from '../components/modal-news-usuario/modal-news-usuario.service';
import { ModalNewPanaderiaService } from '../components/modal-new-panaderia/modal-new-panaderia.service';
import { BuscarResponsableService } from '../components/buscar-responsable/buscar-responsable.service';
import { AltaRelacionService } from '../components/alta-relacion/alta-relacion.service';
import { AltaRelacionLaboralService } from '../components/alta-relacion-laboral/alta-ralacion-laboral.service';





import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGuardGuard,
  AdminGuard,
  SubirArchivoService,
  VerificaTokenGuard,
  PanaderiaService,
  PersonaService,
  FichaPersonaService,
  GrupoFamiliarService,
  MediosService,
  ModalPagoService,
  GenerarPdfService,
  BoletaService
} from './service.index';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    AdminGuard,
    SubirArchivoService,
    ModalUploadService,
    ModalNewsUsuarioService,
    ModalNewPanaderiaService,
    BuscarResponsableService,
    AltaRelacionService,
    AltaRelacionLaboralService,
    VerificaTokenGuard,
    PanaderiaService,
    PersonaService,
    FichaPersonaService,
    GrupoFamiliarService,
    MediosService,
    ModalPagoService,
    GenerarPdfService,
    BoletaService
    ],
  declarations: []
})
export class ServiceModule { }
