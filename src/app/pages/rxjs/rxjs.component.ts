import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  suscripbtion: Subscription;

  constructor() {

    // this.regresaObservable().pipe(retry(2));

    this.suscripbtion = this.regresaObservable().subscribe(
      numero => console.log("Subs", numero),
      error => console.log("Error en el obs", error),
      () => console.log("El observador termino!")
    );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.suscripbtion.unsubscribe();
  }


  regresaObservable() : Observable<any> {
    return new Observable((observer : Subscriber<any>) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        
        contador += 1;
        observer.next(contador);

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        // if (contador === 2) {
        //   clearInterval(intervalo);
        //   observer.error('Auxilio!');
        // }
      }, 1000);
    }).pipe(
      map(resp => resp.valor),
      filter((valor, index) => {
        if (valor % 2 === 1) {
          return true;
        } else {
          return false;
        }
      }));
  }

}
