import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatosProvider } from '../../providers/datos/datos'
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the CrearAmbulanciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-ambulancia',
  templateUrl: 'crear-ambulancia.html',
})
export class CrearAmbulanciaPage {

  companias: any[];
  url = 'http://localhost:8000/'

  constructor(public navCtrl: NavController, public navParams: NavParams, private datos: DatosProvider, private http: HttpClient, private alert: AlertController) {
    this.datos.getCompaniasAmbulancias().subscribe((data: any[]) => {
      this.companias = data
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearAmbulanciaPage');
  }

  crearAmbulancia(compania, placa, conductor, tipo){
    this.http.post(this.url + 'ambulancias/', {
      compania: compania.split('.')[0],
      placa: placa.value,
      conductor: conductor.value,
      tipo: tipo.value
    }).subscribe((data: any[]) =>{
      this.presentAlert('Ambulancia registrada', 'Se registro exitosamente la ambulancia con la placa: ' + placa.value)
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
}
