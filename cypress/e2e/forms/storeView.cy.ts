describe("Product view to product form", () => {
    it("Product view to product form", () => {
        cy.visit('stores/1');
        cy.get('#gotoEditButton').click();
        cy.contains('Edit the store');
    })
})