describe("Standard process",()=>{

  beforeEach(()=>{
    cy.viewport("iphone-6");
    cy.visit('/');
  })

  afterEach(()=>{
    cy.url().should("to.be.equal",'http://localhost:4200/home?refresh=true');
  })

  it('have enough token to extract 5', () => {
  
    cy.get('#white-tokens ion-row ion-col:nth-child(3) ion-fab-button').click();
  
    cy.get('#black-tokens ion-row ion-col:nth-child(3) ion-fab-button').click();
  
    cy.get('#black-tokens ion-row ion-col:nth-child(3) ion-fab-button').click();
  
    cy.get('ion-button').eq(-1).click();
  
    cy.contains('3').click();
  
    cy.get('ion-button').eq(-1).click();
  
    cy.get('app-result ion-button').eq(0).click();
  
    cy.get('app-result .tokens').find('img').should('have.length', 5);
  
    cy.get('app-result ion-button').eq(1).click();
  
  });
  
  it('has not enough token to extract 5', () => {
  
    cy.get('#white-tokens ion-row ion-col:nth-child(3) ion-fab-button').click();
  
    cy.get('#black-tokens ion-row ion-col:nth-child(3) ion-fab-button').click();
  
    cy.get('ion-button').eq(-1).click();
  
    cy.contains('2').click();
  
    cy.get('ion-button').eq(-1).click();
  
    cy.get('app-result ion-button').eq(0).click();
  
    cy.get('app-result .tokens').find('img').should((val)=>{
      expect(val.length).to.be.lessThan(5)
    });
  
    cy.get('app-result ion-button').eq(1).click();
  
  });

})