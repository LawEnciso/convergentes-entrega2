import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatosProvider } from '../../providers/datos/datos'
import { DetalleSemaforoPage } from '../detalle-semaforo/detalle-semaforo';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the SemaforoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-semaforo',
  templateUrl: 'semaforo.html',
})
export class SemaforoPage {

  semaforos: any[];
  detalle:any;
  url = 'http://localhost:8000/'

  constructor(public navCtrl: NavController, public navParams: NavParams, private datos: DatosProvider, private http: HttpClient, private alert: AlertController) {
    this.datos.getSemaforos().subscribe((data: any[]) => {
      this.semaforos = data
    })

    this.http.get(this.url + 'semaforos/').subscribe((data: any[]) => {
      this.semaforos = data
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SemaforoPage');
    this.detalle = DetalleSemaforoPage;
  }

  modificar(semaforo, ubicacion){
    this.http.put(this.url + 'put_semaforo/' + semaforo.id, {
    estado: semaforo.estado,
    descripcion: ubicacion
    }).subscribe((data: any) => {
      console.log(data)
    })
  }

  presentAlert(titulo, cuerpo) {
    let alert = this.alert.create({
      title: titulo,
      subTitle: cuerpo,
      buttons: ['Cerrar']
    });
    alert.present();
  }

  presentPrompt(semaforo) {
    let alert = this.alert.create({
      title: 'Modificar',
      inputs: [
        {
          name: 'ubicacion',
          placeholder: 'nueva ubicacion'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Modificar',
          handler: data => {
            this.modificar(semaforo, data.ubicacion)
          }
        }
      ]
    });
    alert.present();
  }

}
