describe('Shop cart test', () => {
    beforeEach(() => {
        cy.visit('shop/');
    })
    /* it('Buy a product', function () {
         cy.get('#ShopProductElementGalleryContainer1').contains('+').click();
         cy.get('#shoppingCart').click()
         cy.get('[name="confirmDialogShopButton"]').click()
         cy.get("#orderConfirmModal").should('exist').click('topLeft').should('not.exist')
     })
     it('Try to submit the order without adding a product in cart', function () {
         cy.get('#shoppingCart').click()
         cy.get('[name="confirmDialogShopButton"]').click()
         cy.get("#orderConfirmModal").should('not.exist')
     })*/
    it('Add a product in products list and reduce the product in cart shop List', function () {
        cy.get('#ShopProductElementGalleryContainer1').contains('+').click();
        cy.get('#shoppingCart').click()
        cy.get('#ShopCartItem1').should('exist').contains('-').click().should('not.exist');
        cy.get('#emptyCartShop').should('exist')
    })
    it('Add a product in products list and reduce the product in product List', function () {
        cy.get('#ShopProductElementGalleryContainer1').contains('+').click();
        cy.get('#shoppingCart').click()
        cy.get('#ShopCartItem1').should('exist');
        cy.get('#ShopProductElementGalleryContainer1').contains('-').click();

        cy.get('#ShopCartItem1').should('not.exist');
        cy.get('#emptyCartShop').should('exist')
    })
    it('Add a product. Use product text filter to don t show that product. See if cartshop and product list still equal', function () {
        cy.get('#ShopProductElementGalleryContainer1').contains('+').click();
        cy.get('#default-searchfilterproducts').type('shirt')
        cy.get('#buttonSearchfilterproducts').click();
        cy.get('#shoppingCart').click()
        cy.get('#ShopCartItem1').should('exist');
        cy.get('#minusPlusCartItem1input').should('have.value', 1)
        cy.get('#default-searchfilterproducts').clear().type('{enter}');
        cy.get('#minusPlusProductItem1input').should('have.value', 1)
    })
})


