it('not enough token', () => {
    cy.viewport("iphone-6");
    cy.visit('/');
    cy.contains('NOT THE END');
  
    cy.get('#white-tokens ion-row ion-col:nth-child(3) ion-fab-button').click();
  
    cy.get('#black-tokens ion-row ion-col:nth-child(3) ion-fab-button').click();
  
    cy.get('ion-button').eq(-1).click();
  
    cy.contains('2').click();
  
    cy.get('ion-button').eq(-1).click();
  
    cy.get('app-result ion-button').eq(0).click();
  
    cy.get('app-result .tokens').find('img').should('have.length', 4);
  
    cy.get('app-result ion-button').eq(1).click();
  
    cy.url().should((el)=>{
      expect(el).to.be.equal('http://localhost:4200/home?refresh=true');
    });
  });