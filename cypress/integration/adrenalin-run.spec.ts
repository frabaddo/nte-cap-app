describe("Adrenalin process", () => {

    beforeEach(() => {
        cy.viewport("iphone-6");
        cy.visit('/');
    })

    afterEach(() => {
        cy.url().should("to.be.equal", 'http://localhost:4200/home?refresh=true');
    })

    it('can complete an adrenalin run', () => {

        cy.get('.adrenalin-checkbox').click()

        cy.get('#white-tokens ion-row ion-col:nth-child(3) ion-fab-button').click();

        cy.get('#black-tokens ion-row ion-col:nth-child(3) ion-fab-button').click();

        cy.get('ion-button').eq(-1).click();

        cy.url().should("to.be.equal", 'http://localhost:4200/result');

        cy.get('app-result .tokens').find('img').should((val) => {
            expect(val.length).to.be.equal(4)
        });

        cy.get('app-result ion-button').eq(1).click();

    });

});
