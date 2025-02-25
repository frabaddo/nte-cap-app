import { Tokencolor } from "./tokencolor.enum";

export class Token {
  Color: Tokencolor;

  constructor(color: Tokencolor) {
    this.Color = color;
  }
}
