import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetalleAmbulanciaPage } from '../detalle-ambulancia/detalle-ambulancia';
import { DatosProvider } from '../../providers/datos/datos'
import { AlertController } from 'ionic-angular';
import { CrearAmbulanciaPage } from '../crear-ambulancia/crear-ambulancia';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the AmbulanciasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ambulancias',
  templateUrl: 'ambulancias.html',
})
export class AmbulanciasPage {

  detalle:any;
  ambulancias: any[];
  crear: any;
  url = 'http://localhost:8000/'

  constructor(public navCtrl: NavController, public navParams: NavParams, private datos: DatosProvider, private alert: AlertController, private http: HttpClient) {
    this.datos.getAmbulancias().subscribe((data: any[]) => {
      this.ambulancias = data
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AmbulanciasPage');
    this.detalle = DetalleAmbulanciaPage;
    this.crear = CrearAmbulanciaPage;
  }

  modificar(ambulancia, conductor){
    this.http.put(this.url + 'put_ambulancia/' + ambulancia.id, {
      compania: ambulancia.compania,
      placa: ambulancia.placa,
      conductor: conductor,
      tipo: ambulancia.tipo,
      estado: ambulancia.estado
    }).subscribe((data: any[]) => {
      this.presentAlert('Ambulancia modificada', 'Conductor cambiado a: ' + conductor)
    })
  }

  log(msg):void{
    console.log(msg);
  }

  presentAlert(titulo, cuerpo) {
    let alert = this.alert.create({
      title: titulo,
      subTitle: cuerpo,
      buttons: ['Cerrar']
    });
    alert.present();
  }

  presentPrompt(ambulancia) {
    let alert = this.alert.create({
      title: 'Modificar',
      inputs: [
        {
          name: 'conductor',
          placeholder: 'nuevo conductor'
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
            this.modificar(ambulancia, data.conductor)
          }
        }
      ]
    });
    alert.present();
  }
  
}
