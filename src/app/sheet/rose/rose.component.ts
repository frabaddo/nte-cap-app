import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-rose',
  templateUrl: './rose.component.html',
  styleUrls: ['./rose.component.scss'],
})
export class RoseComponent implements OnInit {

  emitEvent: Subject<any> = new Subject()
  @ViewChild("rose", {read: ElementRef}) rose: ElementRef

  posX = 0;
  posY = 0;
  scale = 1;
  last_scale = 1;
  last_posX = 0;
  last_posY = 0;
  max_pos_x = 0;
  max_pos_y = 0;
  transform = "";

  max_scale = 8;
  mid_scale = 4;

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.panzoom()
  }

  doubletap(ev){
    this.emitEvent.next(ev)
  }

  pan(ev){
    this.emitEvent.next(ev)
  }

  pinch(ev){
    this.emitEvent.next(ev)
  }

  panend(ev){
    this.emitEvent.next(ev)
  }
  
  pinchend(ev){
    this.emitEvent.next(ev)
  }

  private panzoom(){
    this.emitEvent.subscribe((ev)=>{
      if (ev.type == "doubletap") {
        if(this.scale!=1){
          this.transform =
                    "translate3d(0, 0, 0) " +
                    "scale3d(1, 1, 1) ";
          this.scale = 1;
          this.last_scale = 1;
        } else {
          this.transform =
            "translate3d(0, 0, 0) " +
            `scale3d(${this.mid_scale}, ${this.mid_scale}, 1) `;
          this.scale = this.mid_scale;
          this.last_scale = this.mid_scale;
        }
        this.renderer.setStyle(this.rose.nativeElement, 'webkitTransform', this.transform)
        this.transform = "";
      }

      //pan    
      if (this.scale != 1) {
          this.posX = this.last_posX + ev.deltaX;
          this.posY = this.last_posY + ev.deltaY;
          this.max_pos_x = Math.ceil((this.scale - 1) * this.rose.nativeElement.clientWidth / 2);
          this.max_pos_y = Math.ceil((this.scale - 1) * this.rose.nativeElement.clientHeight / 2);
          if (this.posX > this.max_pos_x) {
              this.posX = this.max_pos_x;
          }
          if (this.posX < -this.max_pos_x) {
              this.posX = -this.max_pos_x;
          }
          if (this.posY > this.max_pos_y) {
              this.posY = this.max_pos_y;
          }
          if (this.posY < -this.max_pos_y) {
              this.posY = -this.max_pos_y;
          }
      }


      //pinch
      if (ev.type == "pinch") {
          this.scale = Math.max(.999, Math.min(this.last_scale * (ev.scale), this.max_scale));
      }
      if(ev.type == "pinchend"){this.last_scale = this.scale;}

      //panend
      if(ev.type == "panend"){
          this.last_posX = this.posX < this.max_pos_x ? this.posX : this.max_pos_x;
          this.last_posY = this.posY < this.max_pos_y ? this.posY : this.max_pos_y;
      }

      if (this.scale != 1) {
          this.transform =
              "translate3d(" + this.posX + "px," + this.posY + "px, 0) " +
              "scale3d(" + this.scale + ", " + this.scale + ", 1)";
      }

      if (this.transform) {
          this.renderer.setStyle(this.rose.nativeElement, 'webkitTransform', this.transform)
      }
    })
  }
}
