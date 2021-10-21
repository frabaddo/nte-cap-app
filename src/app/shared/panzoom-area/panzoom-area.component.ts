import { Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-panzoom-area',
  templateUrl: './panzoom-area.component.html',
  styleUrls: ['./panzoom-area.component.scss'],
})
export class PanzoomAreaComponent implements OnInit {

  @ViewChild("canvas", { read: ElementRef, static: false }) canvas: ElementRef;
  
  @HostListener("doubletap", ["$event"]) $doubletap(event: any){ this.doubletap(event);}
  @HostListener("pan", ["$event"]) $pan(event: any){ this.pan(event);}
  @HostListener("panend", ["$event"]) $panend(event: any){ this.panend(event);}
  @HostListener("pinch", ["$event"]) $pinch(event: any){ this.pinch(event);}
  @HostListener("pinchend", ["$event"]) $pinchend(event: any){ this.pinchend(event);}

  @Input("maxScale") max_scale = 6;
  @Input("doubleTapScale") doubletap_scale = 2;

  emitEvent: Subject<any> = new Subject()

  posX = 0;
  posY = 0;
  scale = 1;
  last_scale = 1;
  last_posX = 0;
  last_posY = 0;
  max_pos_x = 0;
  max_pos_y = 0;
  transform = "";


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

        this.scale = Math.max(.999, Math.min(this.last_scale + this.doubletap_scale, this.max_scale));

        this.transform =
          "translate3d(0, 0, 0) " +
          `scale3d(${this.scale}, ${this.scale}, 1) `;
        this.last_scale = this.scale;

        this.renderer.setStyle(this.canvas.nativeElement, 'webkitTransform', this.transform)
        this.transform = "";
      }

      //pan    
      if (this.scale != 1) {
          this.posX = this.last_posX + ev.deltaX;
          this.posY = this.last_posY + ev.deltaY;
          this.max_pos_x = Math.ceil((this.scale - 1) * this.canvas.nativeElement.clientWidth / 2);
          this.max_pos_y = Math.ceil((this.scale - 1) * this.canvas.nativeElement.clientHeight / 2);
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
          this.renderer.setStyle(this.canvas.nativeElement, 'webkitTransform', this.transform)
      }
    })
  }
}
