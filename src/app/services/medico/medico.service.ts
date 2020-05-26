import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';
import { Medico } from 'src/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(public http: HttpClient, public _usuarioService: UsuarioService) { }
  totalMedicos: number = 0;

  cargarMedicos() {
    let url = `${URL_SERVICIOS}/medico`;

    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalMedicos = resp.total;
        return resp.medicos;
      })
    );
  }

  cargarMedico(id: string) {
    let url = `${URL_SERVICIOS}/medico/${id}`;

    return this.http.get(url).pipe(
      map((resp: any) => resp.medico)
    );
  }

  buscarMedicos(termino: string) {
    let url = `${URL_SERVICIOS}/busqueda/coleccion/medicos/${termino}`;

    return this.http.get(url).pipe(
      map((resp: any) => resp.medicos)
    );
  }

  borrarMedico(id: string) {
    let url =`${URL_SERVICIOS}/medico/${id}?token=${this._usuarioService.token}`;

    return this.http.delete(url).pipe(
      map(resp => {
        swal('Medico borrado', 'Médico borrado correctamente', 'success');
        return resp;
      })
    )
  }

  guardarMedico(medico: Medico) {
    if (medico._id) {
      // actualizando
      let url = `${URL_SERVICIOS}/medico/${medico._id}?token=${this._usuarioService.token}`;

      return this.http.put(url, medico).pipe(
        map((resp: any) => {
          swal('Médico Actualizado', medico.nombre, 'success');
          return resp.medico;
        })
      )
    } else {
      // creando
      let url = `${URL_SERVICIOS}/medico?token=${this._usuarioService.token}`;

      return this.http.post(url, medico).pipe(
        map((resp: any) => {
          swal('Médico creado', medico.nombre, 'success');
          return resp.medico;
        })
      );
    }

  }
}
