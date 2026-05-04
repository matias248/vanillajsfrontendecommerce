describe('Product list items', () => {
    beforeEach(() => {
        cy.visit('shop/');
    })

    it('Click - when quantity is 0 in product list item', function () {
        cy.get('#ShopProductElementGalleryContainer1').contains('-').should('be.disabled')
        cy.get('#shoppingCart').click()
        cy.get('#ShopCartItem1').should('not.exist');
        cy.get('#emptyCartShop').should('exist')
    })
    it('Quantity input: Type a not numerical symbol', function () {
        cy.get('#minusPlusProductItem1input').type('a@-.,<').should('have.value',0)
    })
    it('Quantity input: eliminate carater and put a number', function () {
        cy.get('#minusPlusProductItem1input').clear().type('1').should('have.value',1)
    })
    it('Quantity input: 07 should be 7', function () {
        cy.get('#minusPlusProductItem1input').type('7').should('have.value',7)
    })
    it('Learn more button test if appears and dissapears', function () {
        cy.get('#learnMore1').click()
        cy.get('#descriptionProductText1').should('exist')
        cy.get('#descriptionProductCrossIcon1').click();
        cy.get('#descriptionProductText1').should('not.exist')
    })
})
