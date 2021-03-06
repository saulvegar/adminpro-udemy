import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { SubirArchivoService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }

  seleccionarImagen(file: File) {
    if (!file) {
      return;
    }

    if (file.type.indexOf('image') < 0) {
      swal('Sólo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = file;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(file);

    reader.onloadend = () => this.imagenTemp = reader.result.toString();
  }

  subirImagen() {
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
      .then(resp => {
        this._modalUploadService.notificacion.emit(resp);
        this.cerrarModal();
      })
      .catch(err => {
        console.log('Error en la carga...')
      });
  }
}
