import { Token } from './token';
import { Tokencolor } from './tokencolor.enum'

describe('Token', () => {

  it('should create a token white', () => {
    let token = new Token(Tokencolor.White);
    expect(token.Color).toEqual(Tokencolor.White);
  });

  it('should create a token black', () => {
    let token = new Token(Tokencolor.Black);
    expect(token.Color).toEqual(Tokencolor.Black);
  });

});
