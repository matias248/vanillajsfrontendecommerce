describe("Navigation bar test", () => {
    it("In Store view to store list", () => {
        cy.visit('stores/1/');
        cy.get('#NavStoresTitle').click();
        cy.contains('List of stores');
    })
    it("In Store form to store view", () => {
        cy.visit('stores/1/edit');
        cy.get('#NavStoreName').click();
        cy.contains('Details of the store');
    })
    it("In Product list to store list", () => {
        cy.visit('stores/1/products');
        cy.get('#NavStoresTitle').click();
        cy.contains('List of stores');
    })
    it("In Product list to store view", () => {
        cy.visit('stores/1/products');
        cy.get('#NavStoreName').click();
        cy.contains('Details of the store');
    })
    it("In Product view to store list", () => {
        cy.visit('stores/1/products/1');
        cy.get('#NavStoresTitle').click();
        cy.contains('List of stores');
    })
    it("In Product view to store form", () => {
        cy.visit('stores/1/products/1');
        cy.get('#NavStoreName').click();
        cy.contains('Details of the store');
    })
    it("In Product view to product list", () => {
        cy.visit('stores/1/products/1');
        cy.get('#NavProductsTitle').click();
        cy.contains('List of products');
    })
    it("In Product form to product view", () => {
        cy.visit('stores/1/products/1/edit');
        cy.get('#NavProductName').click();
        cy.contains('Details of the product');
    })
    it("In Product form to product list", () => {
        cy.visit('stores/1/products/1/edit');
        cy.get('#NavProductsTitle').click();
        cy.contains('List of products');
    })
})

describe("Navigation Buttons", () => {
    it("Home", () => {
        cy.visit('/');

        cy.get('#NavigationFormsApp').should('exist');
        cy.get('#NavigationShopApp').should('exist');
        //cy.get('#NavigationFinanceApp').should('exist');

    }),
    it("ToForms", () => {
        cy.visit('/');

        cy.get('#NavigationFormsApp').click().should('not.exist');
        cy.get('#NavigationShopApp').should('exist');
        //cy.get('#NavigationFinanceApp').should('exist');
        cy.contains('List of stores')
    })
    it("To Shop", () => {
        cy.visit('/');

        cy.get('#NavigationShopApp').click().should('not.exist');
        //cy.get('#NavigationFinanceApp').should('exist');
        cy.get('#NavigationFormsApp').should('exist');

        cy.contains('Our Categories')

    })
    /*it("To Finance", () => {
        cy.visit('/');

        cy.get('#NavigationFinanceApp').click().should('not.exist');
        cy.get('#NavigationShopApp').should('exist');
        cy.get('#NavigationFormsApp').should('exist');

        

        cy.location().should((location:Location) => {
            expect(location.pathname).to.eq('/finance')
        })
    })*/
})



