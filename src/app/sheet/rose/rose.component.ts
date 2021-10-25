import { Component, OnInit } from '@angular/core';
import { SheetExagon, SheetExagonType } from '../model/sheet-hexagon';

@Component({
  selector: 'app-rose',
  templateUrl: './rose.component.html',
  styleUrls: ['./rose.component.scss'],
})
export class RoseComponent implements OnInit {

  hexagons:SheetExagon[][] = []

  constructor() { }

  ngOnInit() {
    this.hexagons = [0,1,2,3,4].map((el,i)=>{
      if(i==0||i==4){
        return [0,1,2].map((val)=>({
          type: SheetExagonType.skill,
          text: 'axvhjvshx has ahjs scsojcdischidschidscidschndsc djsbc sdsdhjcvdsbhjcvbhdjsc sdch sjcbsdcjsdb cjhnsd csdn sdhjc bjsdc jks dcdsdschkjsdbcjsd csdjhbcjdsbcjksdb',
          position: [i, val]
        }))
      }
      if(i==1 || i==3) {
        return [0,1,2,3].map((val)=>({
          type: (val==0 || val==3) ? SheetExagonType.skill : SheetExagonType.quality,
          text: '',
          position: [i, val]
        }))
      }
      if(i==2) {
        return [0,1,2,3,4].map((val)=>({
          type: (val==0 || val==4) ? SheetExagonType.skill : (val==2) ? SheetExagonType.archetype : SheetExagonType.quality,
          text: '',
          position: [i, val]
        }))
      }
    })
    console.log(this.hexagons)
  }

}
