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
  ) { }

  ngOnInit() {}

  openEdit(){

  }

}
