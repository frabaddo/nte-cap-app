describe("Confusion process", () => {

    beforeEach(() => {
        cy.viewport("iphone-6");
        cy.visit('/');
    })

    afterEach(() => {
        cy.url().should("to.be.equal", 'http://localhost:4200/home?refresh=true');
    })

    it('have enough token to extract 5 with confusion', () => {

        let blackCount = 0;

        for (let i = 0; i < 5; i++) {

            cy.log("test " + i + " of ", 5);

            cy.url().should("include", 'http://localhost:4200/home');

            cy.get('.confusion-checkbox').click()

            cy.get('#white-tokens ion-row ion-col:nth-child(3) ion-fab-button').click();

            cy.get('#white-tokens ion-row ion-col:nth-child(3) ion-fab-button').click();

            cy.get('#white-tokens ion-row ion-col:nth-child(3) ion-fab-button').click();

            cy.get('ion-button').eq(-1).click();

            cy.contains('3').click();

            cy.get('ion-button').eq(-1).click();

            cy.get('app-result ion-button').eq(0).click();

            cy.get('app-result .tokens').find('img[src*="Nero"]').then((ele) => {
                blackCount += ele.length;
            })

            cy.get('app-result ion-button').eq(1).click();
        }

        cy.should(() => {
            expect(blackCount).to.be.greaterThan(5);
        })

    });

});