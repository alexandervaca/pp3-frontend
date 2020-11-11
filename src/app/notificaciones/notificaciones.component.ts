import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from 'src/shared/services/notificaciones.service';
import { UsuariosService } from 'src/shared/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  notificaciones: Notification[];

  constructor(private notificacionesService: NotificacionesService, private usuarioService: UsuariosService, private router: Router) { }

  ngOnInit() {
    this.getProductos();
  }

  getProductos(): void {
    this.notificacionesService.getNotificaciones()
    .subscribe(
      elem => { 
        this.notificaciones = elem.notificaciones;
       },
      error => {
        if (error.error.message === 'Acceso denegado') {
          this.usuarioService.cerrarSesion();
          this.router.navigateByUrl('/login');
          return;
        }
        this.notificaciones = [];
       }
    );
  }

}
