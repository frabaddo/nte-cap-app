import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-panzoom-area',
  templateUrl: './panzoom-area.component.html',
  styleUrls: ['./panzoom-area.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanzoomAreaComponent implements AfterViewInit {

  @ViewChild("canvas", { read: ElementRef, static: false }) canvas: ElementRef;

  @Input("maxScale") max_scale = 6;
  @Input("doubleTapScale") doubletap_scale = 2;
  @Input("allowDoubleTap") allowDoubleTap = true;

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
    private renderer: Renderer2,
    private element: ElementRef
  ) { }

  ngAfterViewInit(){
    ["doubletap","pan","panend","pinch","pinchend"].forEach( ev =>
      this.renderer.listen(this.canvas.nativeElement, ev, (event) => {
        this.panzoom(event);
      })
    )
  }

  private panzoom(ev){
    if (ev.type == "doubletap" && this.allowDoubleTap) {

      this.scale = Math.max(1, Math.min(this.last_scale + this.doubletap_scale, this.max_scale));

      this.transform =
        "translate(0, 0) " +
        `scale3d(${this.scale}, ${this.scale}, 1) `;
      this.last_scale = this.scale;

      this.renderer.setStyle(this.canvas.nativeElement, 'webkitTransform', this.transform)
      this.transform = "";
    }

    //pan
    if(ev.deltaX || ev.deltaY){
      this.posX = this.last_posX + ev.deltaX;
      this.posY = this.last_posY + ev.deltaY;
      let cw = this.canvas.nativeElement.scrollWidth
      let ch = this.canvas.nativeElement.scrollHeight
      this.max_pos_x = Math.ceil((((this.scale - 1) * cw  ) / 2));
      this.max_pos_y = Math.ceil((((this.scale - 1) * ch  ) / 2));
      let mcw = this.max_pos_x + (cw - this.element.nativeElement.clientWidth)
      let mch = this.max_pos_y + (ch - this.element.nativeElement.clientHeight)
      if (this.posX > this.max_pos_x) {
          this.posX = this.max_pos_x;
      }
      if (this.posX < -(mcw)) {
          this.posX = -(mcw);
      }
      if (this.posY > this.max_pos_y) {
          this.posY = this.max_pos_y;
      }
      if (this.posY < -(mch)) {
          this.posY = -(mch);
      }
    }


    //pinch
    if (ev.type == "pinch") {
        this.scale = Math.max(1, Math.min(this.last_scale * (ev.scale), this.max_scale));
    }
    if(ev.type == "pinchend"){this.last_scale = this.scale;}

    //panend
    if(ev.type == "panend"){
        this.last_posX = this.posX < this.max_pos_x ? this.posX : this.max_pos_x;
        this.last_posY = this.posY < this.max_pos_y ? this.posY : this.max_pos_y;
    }

    this.transform =
        "translate(" + this.posX + "px," + this.posY + "px) " +
        "scale3d(" + this.scale + ", " + this.scale + ", 1)";

    this.renderer.setStyle(this.canvas.nativeElement, 'webkitTransform', this.transform)
  }
}
