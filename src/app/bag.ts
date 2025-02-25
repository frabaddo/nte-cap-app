import { Token } from "./token";
import { Tokencolor } from "./tokencolor.enum";

export class Bag {
  Tokens: Array<Token> = [];

  ExtractedToken: Array<Token> = [];

  RiskExtractedToken: Array<Token> = [];

  yetInserted: Boolean = false;

  yetExtracted: Boolean = false;

  yetExtrctedRisk: Boolean = false;

  revealRemains: Boolean = false;

  constructor(
    bag: {
      Tokens: Array<Token>;
      ExtractedToken: Array<Token>;
      RiskExtractedToken: Array<Token>;
    } = undefined,
  ) {
    if (bag) {
      if (bag.Tokens) this.Tokens = bag.Tokens;
      if (bag.ExtractedToken) this.ExtractedToken = bag.ExtractedToken;
      if (bag.RiskExtractedToken)
        this.RiskExtractedToken = bag.RiskExtractedToken;
      this.yetExtracted = true;
      this.yetExtrctedRisk = true;
      this.yetInserted = true;
    }
  }

  insertTokens(
    white: number,
    black: number,
    confusionToken: number = 0,
    confusion = false,
  ) {
    if (!this.yetInserted) {
      this.yetInserted = true;
      this.Tokens = this.Tokens.concat(
        Array.from({ length: black }, () => new Token(Tokencolor.Black)),
      );
      this.Tokens = this.Tokens.concat(
        Array.from({ length: white }, () => new Token(Tokencolor.White)),
      );
      if (confusion) {
        this.Tokens = this.Tokens.concat(
          Array.from({ length: confusionToken }, () => {
            if (Math.random() >= 0.5) return new Token(Tokencolor.White);
            else return new Token(Tokencolor.Black);
          }),
        );
      }
    }
  }
  extractTokens(n) {
    if (!this.yetExtracted) {
      this.yetExtracted = true;
      this.shuffle(this.Tokens);
      this.ExtractedToken = this.Tokens.splice(0, n);
    }
  }
  extractRiskTokens() {
    if (!this.yetExtrctedRisk) {
      this.yetExtrctedRisk = true;
      this.shuffle(this.Tokens);
      this.RiskExtractedToken = this.Tokens.splice(
        0,
        5 - this.ExtractedToken.length,
      );
    }
  }
  get isExtracteable(): boolean {
    return this.Tokens.length > 0;
  }
  cleanBag() {
    this.Tokens = [];
    this.ExtractedToken = [];
    this.RiskExtractedToken = [];
    this.yetInserted = false;
    this.yetExtracted = false;
    this.yetExtrctedRisk = false;
    this.revealRemains = false;
  }

  private shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
