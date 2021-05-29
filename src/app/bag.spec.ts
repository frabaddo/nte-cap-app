import { Bag } from './bag';
import { Tokencolor } from './tokencolor.enum';

describe('Bag', () => {

  let bag : Bag;

  beforeEach(()=>{
    bag = new Bag();
  })

  it('should be created', () => {
    expect(bag).toBeDefined();
  });

  it('should be empty', () => {
    expect(bag.Tokens).toEqual([]);
    expect(bag.ExtractedToken).toEqual([]);
    expect(bag.RiskExtractedToken).toEqual([]);
  });

  it('should be able to add tokens', () => {
    bag.insertTokens(2,3);
    let black = bag.Tokens.filter(t=>t.Color==Tokencolor.Black).length;
    let white = bag.Tokens.filter(t=>t.Color==Tokencolor.White).length;

    expect(black).toBe(3);
    expect(white).toBe(2);
  });

  it('should be not able to add tokens multiple times', () => {
    bag.insertTokens(2,3);
    bag.insertTokens(1,1);
    let black = bag.Tokens.filter(t=>t.Color==Tokencolor.Black).length;
    let white = bag.Tokens.filter(t=>t.Color==Tokencolor.White).length;

    expect(black).toBe(3);
    expect(white).toBe(2);
  });

  it('should be extract right number of tokens', () => {
    bag.insertTokens(2,3);
    let black = bag.Tokens.filter(t=>t.Color==Tokencolor.Black).length;
    let white = bag.Tokens.filter(t=>t.Color==Tokencolor.White).length;

    bag.extractTokens(2);

    let extracted_black = bag.ExtractedToken.filter(t=>t.Color==Tokencolor.Black).length;
    let extracted_white = bag.ExtractedToken.filter(t=>t.Color==Tokencolor.White).length;

    let in_black = bag.Tokens.filter(t=>t.Color==Tokencolor.Black).length;
    let in_white = bag.Tokens.filter(t=>t.Color==Tokencolor.White).length;

    expect(black - extracted_black).toBe(in_black);
    expect(white - extracted_white).toBe(in_white);
  });

  it('should be extract right number of risk tokens', () => {
    bag.insertTokens(2,6);
    let black = bag.Tokens.filter(t=>t.Color==Tokencolor.Black).length;
    let white = bag.Tokens.filter(t=>t.Color==Tokencolor.White).length;

    bag.extractTokens(2);
    bag.extractRiskTokens();

    let extracted_black = bag.ExtractedToken.filter(t=>t.Color==Tokencolor.Black).length;
    let extracted_white = bag.ExtractedToken.filter(t=>t.Color==Tokencolor.White).length;
    let extracted_risk_black = bag.RiskExtractedToken.filter(t=>t.Color==Tokencolor.Black).length;
    let extracted_risk_white = bag.RiskExtractedToken.filter(t=>t.Color==Tokencolor.White).length;

    let in_black = bag.Tokens.filter(t=>t.Color==Tokencolor.Black).length;
    let in_white = bag.Tokens.filter(t=>t.Color==Tokencolor.White).length;

    expect(black - (extracted_black + extracted_risk_black)).toBe(in_black);
    expect(white - (extracted_white + extracted_risk_white)).toBe(in_white);
    expect(extracted_risk_black + extracted_risk_white + extracted_black + extracted_white).toBe(5);
  });

  it('should know if is extracteable', () => {

    let before = bag.isExtracteable;
    
    bag.insertTokens(2,1);
    
    let after = bag.isExtracteable;

    expect(before).toBeFalsy();
    expect(after).toBeTruthy();
  });

  it('should be extract right number of tokens if not enought', () => {
    bag.insertTokens(2,1);
    let black = bag.Tokens.filter(t=>t.Color==Tokencolor.Black).length;
    let white = bag.Tokens.filter(t=>t.Color==Tokencolor.White).length;

    bag.extractTokens(2);
    bag.extractRiskTokens();

    let extracted_black = bag.ExtractedToken.filter(t=>t.Color==Tokencolor.Black).length;
    let extracted_white = bag.ExtractedToken.filter(t=>t.Color==Tokencolor.White).length;
    let extracted_risk_black = bag.RiskExtractedToken.filter(t=>t.Color==Tokencolor.Black).length;
    let extracted_risk_white = bag.RiskExtractedToken.filter(t=>t.Color==Tokencolor.White).length;

    let in_black = bag.Tokens.filter(t=>t.Color==Tokencolor.Black).length;
    let in_white = bag.Tokens.filter(t=>t.Color==Tokencolor.White).length;

    expect(black - (extracted_black + extracted_risk_black)).toBe(in_black);
    expect(white - (extracted_white + extracted_risk_white)).toBe(in_white);
    expect(extracted_risk_black + extracted_risk_white + extracted_black + extracted_white).toBe(3);
  });

  it('should know if is extracteable', () => {

    let before = bag.isExtracteable;
    
    bag.insertTokens(2,1);
    
    let after = bag.isExtracteable;

    expect(before).toBeFalsy();
    expect(after).toBeTruthy();
  });
});
