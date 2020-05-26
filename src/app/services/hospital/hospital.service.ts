import { Injectable } from '@angular/core';
import { Hospital } from 'src/models/hospital.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  totalHospitales: number;

  constructor(public http: HttpClient, public _usuarioService: UsuarioService) {

  }

  cargarHospitales() {
    let url = `${URL_SERVICIOS}/hospital`;

    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalHospitales = resp.total;
        return resp.hospitales;
      })
    );
  }

  obtenerHospital(id: string) {
    let url = `${URL_SERVICIOS}/hospital/${id}`;

    console.log("hola")
    return this.http.get(url).pipe(
      map((resp: any) => {

        console.log(resp.hospital)
        return resp.hospital
      })
    );
  }

  borrarHospital(id: string) {
    let url = `${URL_SERVICIOS}/hospital/${id}?token=${this._usuarioService.token}`;

    return this.http.delete(url).pipe(
      map(resp => {
        swal('Hospital borrado', 'El hospital ha sido borrado correctamente', 'success');
        return true;
      })
    );
  }

  crearHospital(nombre: string) {
    let url = `${URL_SERVICIOS}/hospital?token=${this._usuarioService.token}`;
    return this.http.post(url, { nombre }).pipe(
      map((resp: any) => {
        swal('Hospital creado', nombre, 'success');
        return resp.hospital;
      })
    );
  }

  buscarHospital(termino: string) {
    let url = `${URL_SERVICIOS}/busqueda/coleccion/hospitales/${termino}`;

    return this.http.get(url).pipe(
      map((resp: any) => resp.hospitales)
    );
  }

  actualizarHospital(hospital: Hospital) {
    let url = `${URL_SERVICIOS}/hospital/${hospital._id}?token?${this._usuarioService.token}`;

    return this.http.put(url, hospital).pipe(
      map((resp: any) => {
        swal('Hospital actualizado', hospital.nombre, 'success');
        return resp.hospital;
      })
    )
  }
}
