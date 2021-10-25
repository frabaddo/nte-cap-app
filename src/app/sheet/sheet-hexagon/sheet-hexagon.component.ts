import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SheetExagon } from '../model/sheet-hexagon';

@Component({
  selector: 'app-sheet-hexagon',
  templateUrl: './sheet-hexagon.component.html',
  styleUrls: ['./sheet-hexagon.component.scss'],
})
export class SheetHexagonComponent implements OnInit {

  @Input() element: SheetExagon

  @HostListener("click", ['$event']) onclick(event) {
    this.openEdit()
  }

  constructor(
    private alertController: AlertController
  ) { }

  ngOnInit() {}

  async openEdit(){
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!'+JSON.stringify( this.element.position),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
  
    await alert.present();
  }

}
