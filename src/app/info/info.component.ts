import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {

  constructor(
    private popover:PopoverController
  ) { }

  ngOnInit() {}

  close(){
    this.popover.dismiss();
  }
}
