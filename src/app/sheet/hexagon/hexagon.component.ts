import { Component, HostBinding, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-hexagon',
  templateUrl: './hexagon.component.html',
  styleUrls: ['./hexagon.component.scss'],
})
export class HexagonComponent implements OnInit {

  @HostListener("click", ['$event']) onclick(event) {
    console.log(event)
  }

  constructor() { }

  ngOnInit() {}

}
